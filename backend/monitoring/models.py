from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Site(models.Model):
    siteName = models.CharField(max_length=120)
    description = models.TextField()
    siteLink = models.CharField(max_length=120)
    owner = models.ForeignKey(User, related_name="sites", on_delete=models.CASCADE, null=True)