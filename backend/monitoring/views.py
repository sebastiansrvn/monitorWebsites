import urllib
from rest_framework import viewsets
from .serializers import SiteSerializer
from rest_framework.decorators import action
from .models import Site
from rest_framework.response import Response
from threading import Thread
import ssl
import OpenSSL
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from rest_framework import status
import environ

class SiteView(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()
    env = environ.Env()
    environ.Env.read_env()
    client = WebClient(token=env('SLACK_AUTH'))

    def send_alert(self, message):
        try:
            # Call the chat.postMessage method using the WebClient
            result = self.client.chat_postMessage(
                channel=self.env("SLACK_CHANNEL_ID"), 
                text=message
            )

        except SlackApiError as e:
            print(e)

    def get_ssl_expire_date(self, host, port):
        host = "mussrvweb01.utep.edu"
        cert = ssl.get_server_certificate((host, port))
        x509 = OpenSSL.crypto.load_certificate(OpenSSL.crypto.FILETYPE_PEM, cert)
        print(x509.get_notAfter())

    @action(detail=True)
    def get_all(self, request, pk=None):

        all_sites = []
        def load_site(site):
            site_is_up = False 
            try:
                if (int(urllib.request.urlopen(site.siteLink).getcode()) == 200):
                    site_is_up = True
            except:
                site_is_up = False
                self.send_alert((site.siteName + " is down!"))
            
            # self.get_ssl_expire_date(site.siteLink, 443)
            all_sites.append({
                'id': site.id,
                'siteName': site.siteName,
                'siteLink': site.siteLink,
                'description': site.description,
                'siteIsUp': site_is_up,
            })


        sites = Site.objects.all()
        threads = [Thread(target=load_site, args = [site]) for site in sites]
        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()
        return Response(all_sites)
        
    @action(detail=True)
    def get_status(self, request, pk=None):
        site = Site.objects.get(pk=int(pk))
        siteIsUp = False 
        try:
            if (int(urllib.request.urlopen(site.siteLink).getcode()) == 200):
                siteIsUp = True
        except:
            siteIsUp = False
        
        siteLink = site.siteLink
        return Response({
            'siteName': site.siteName,
            'siteLink': siteLink,
            'status': siteIsUp
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
