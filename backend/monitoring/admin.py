from django.contrib import admin
from .models import Site, ResponseTime

# Register your models here.

class SiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'siteName', 'description', 'siteLink')

class ResponseTimesAdmin(admin.ModelAdmin):
    list_display = ('siteID', 'responseTime', 'timeRecorded')

admin.site.register(Site, SiteAdmin)
admin.site.register(ResponseTime, ResponseTimesAdmin)