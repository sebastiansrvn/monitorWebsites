from argparse import Action
from telnetlib import STATUS
import urllib
from xmlrpc.client import ResponseError
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SiteSerializer
from rest_framework.decorators import action
from .models import Site
from rest_framework.response import Response

class SiteView(viewsets.ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()

    @action(detail=True)
    def get_all(self, request, pk=None):
        sites = Site.objects.all()
        allSites = []
        for site in sites:
            siteIsUp = False 
            try:
                if (int(urllib.request.urlopen(site.siteLink).getcode()) == 200):
                    siteIsUp = True
            except:
                siteIsUp = False
            allSites.append({
                'id': site.id,
                'siteName': site.siteName,
                'siteLink': site.siteLink,
                'sslCertificate': site.sslCertificate,
                'description': site.description,
                'siteIsUp': siteIsUp
            })
        return Response(allSites)
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
            'sslDate': site.sslCertificate,
            'status': siteIsUp
            })