import site
import time
from urllib import response
import requests
from rest_framework import viewsets
from django.utils import timezone, dateformat
from .serializers import SiteSerializer, ResponseTimeSerializer
from rest_framework.decorators import action
from .models import Site, ResponseTime
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from threading import Thread
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from rest_framework import status
import environ
import ssl
import socket
from datetime import datetime


class SiteView(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()
    env = environ.Env()
    environ.Env.read_env()
    client = WebClient(token=env('SLACK_AUTH'))

    def send_alert_mail(self, subject, message):
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [settings.RECIPIENT_ADDRESS],
            fail_silently=False,
        )

    def send_alert_slack(self, message):
        try:
            result = self.client.chat_postMessage(
                channel=self.env("SLACK_CHANNEL_ID"),
                text=message
            )

        except SlackApiError as e:
            print(e)

    def get_ssl_expire_date(self, host):
        host = host.replace('https://', '')
        host = host.replace('http://', '')
        port = 443
        ssl_date_fmt = r'%b %d %H:%M:%S %Y %Z'
        try:
            today = datetime.now()
            context = ssl.create_default_context()
            conn = context.wrap_socket(
                socket.socket(socket.AF_INET),
                server_hostname=host,
            )
            # 3 second timeout because Lambda has runtime limitations
            conn.settimeout(3.0)
            conn.connect((host, port))
            ssl_info = conn.getpeercert()
            # parse the string from the certificate into a Python datetime object
            res = datetime.strptime(ssl_info['notAfter'], ssl_date_fmt)
        except:
            return "N/A"
        else:
            return (res - today).days

    @action(detail=True)
    def get_all(self, request, pk=None):

        all_sites = {
            'sites': [],
            'alerts': []
        }

        def load_site(site):
            site_is_up = False
            try:
                site_request = requests.head(
                    site.siteLink, allow_redirects=True)
                if site_request.status_code == 200:
                    site_is_up = True
                    self.record_response_time(
                        site.id, site_request.elapsed.total_seconds(), dateformat.format(timezone.localtime(), 'Y-m-d H:i:s'))
            except:
                pass

            if not site_is_up:
                site_is_up = False
                all_sites['alerts'].append({
                    'id': site.id, 
                    'siteName': site.siteName, 
                    'message': (site.siteName + " is down")
                    })
                # self.send_alert_slack((site.siteName + " is down!"))
                # self.send_alert_mail((site.siteName + " is down!"), (site.siteName + " is down!"))

            sslExpirationDate = self.get_ssl_expire_date(site.siteLink)
            try:
                if sslExpirationDate < 200:
                    all_sites['alerts'].append({
                        'id': site.id, 
                        'siteName': site.siteName, 
                        'message': (
                            site.siteName + "'s SSL certificate expires in " + str(sslExpirationDate) + " days!")
                        })
                    # self.send_alert_mail((site.siteName + " s SSL certificate expires soon!"), (site.siteName + "'s SSL certificate expires in " + str(sslExpirationDate) + " days!"))
                    # self.send_alert_slack(site.siteName + "'s SSL certificate expires in " + str(sslExpirationDate) + " days!")
            except:
                pass
            all_sites['sites'].append({
                'id': site.id,
                'siteName': site.siteName,
                'siteLink': site.siteLink,
                'description': site.description,
                'siteIsUp': site_is_up,
                'sslExpiresIn': sslExpirationDate
            })

        sites = Site.objects.all()
        threads = [Thread(target=load_site, args=[site]) for site in sites]
        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()
        return Response(all_sites)

    @action(detail=True)
    def get_status_single(self, request, pk=None):
        site = Site.objects.get(pk=int(pk))
        siteIsUp = False
        try:
            if requests.head(site.siteLink, allow_redirects=True).status_code == 200:
                siteIsUp = True
        except:
            siteIsUp = False

        siteLink = site.siteLink
        return Response({
            'siteName': site.siteName,
            'description': site.description,
            'siteLink': siteLink,
            'status': siteIsUp,
            'sslExpiresIn': self.get_ssl_expire_date(site.siteLink)
        })

    @action(detail=True)
    def delete_record(self, request, pk=None):
        site = Site.objects.get(pk=int(pk))
        site.delete()

        return Response({
            "deleted": "success"
        })

    @action(detail=True, methods=['POST'])
    def update_record(self, request, pk=None):
        site = Site.objects.get(pk=int(pk))
        # data = request.data
        serializer = SiteSerializer(site, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def record_response_time(self, site_id, response_time, time_recorded):
        try:
            ResponseTime.objects.create(
                siteID=site_id,
                responseTime=response_time,
                timeRecorded=time_recorded
            )
        except:
            print(
                "Error storing response time! Make sure the it is using the correct format for the parameters.")


class ResponseTimeView(viewsets.ModelViewSet):
    serializer_class = ResponseTimeSerializer
    queryset = ResponseTime.objects.all()
    
    @action(detail=True)
    def get_response_times(self, request, pk=None):
        site_response_times = ResponseTime.objects.filter(siteID=pk)
        timesRecorded = []
        response_times = []
        for site in site_response_times[:10]:
            timeRecorded = timezone.make_naive(timezone.localtime(site.timeRecorded))
            timeRecorded = datetime.strptime(str(timeRecorded), "%Y-%m-%d %H:%M:%S")
            timesRecorded.append(str(timeRecorded.hour) + ":" + str(timeRecorded.minute )+ ":" + str(timeRecorded.second))
            response_times.append(site.responseTime)
        return Response({ "responseTimes": response_times, "labels": timesRecorded })