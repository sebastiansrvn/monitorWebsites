from django.db import models

# Create your models here.

class Site(models.Model):
    siteName = models.CharField(max_length=120)
    description = models.TextField()
    siteLink = models.CharField(max_length=120)

class ResponseTime(models.Model):
    siteID = models.IntegerField()
    responseTime = models.FloatField()
    timeRecorded = models.DateTimeField(null=True)