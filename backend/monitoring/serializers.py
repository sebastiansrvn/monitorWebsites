from statistics import mode
from rest_framework import serializers
from .models import Site, ResponseTime

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ('id', 'siteName', 'description', 'siteLink')

class ResponseTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseTime
        fields = ('siteID', 'responseTime', 'timeRecorded')