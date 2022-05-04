from rest_framework import viewsets
from django.utils import timezone
from .serializers import ResponseTimeSerializer
from rest_framework.decorators import action
from .models import ResponseTime
from rest_framework.response import Response
from datetime import datetime

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
            timeRecorded = datetime.strptime(str(timeRecorded), "%Y-%m-%d %H:%M:%S.%f")
            timesRecorded.append(str(timeRecorded.hour) + ":" + str(timeRecorded.minute )+ ":" + str(timeRecorded.second))
            response_times.append(site.responseTime)
        return Response({ "responseTimes": response_times, "labels": timesRecorded })