import urllib
from rest_framework import viewsets
from .serializers import SiteSerializer
from rest_framework.decorators import action
from .models import Site
from rest_framework.response import Response
from threading import Thread
import ssl
import OpenSSL
from django.core.mail import send_mail;

class SiteView(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()

    @action(detail=True)
    def get_alert(self, request, pk=None):
        send_mail(
            'Testing Email Subject',
            'Testing Email Body',
            'testing@example.com',
            ['servinseb@hotmail.com'],
            fail_silently=False,
        )

    def get_ssl_expire_date(self, host, port):
        # print(host)
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
            # print(site.siteName)
            # load_site(site)
            # new_thread = Thread(target=load_site, args=[site])
            # new_thread.start()
            # new_thread.join()
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
        
        siteUrl = site.siteLink
        return Response({
            'siteName': site.siteName,
            'siteUrl': siteUrl,
            'status': siteIsUp
            })