from django.db import models

class ResponseTime(models.Model):
    siteID = models.IntegerField()
    responseTime = models.FloatField()
    timeRecorded = models.DateTimeField(null=True)