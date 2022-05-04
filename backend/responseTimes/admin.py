from django.contrib import admin
from .models import ResponseTime

# Register your models here.
class ResponseTimesAdmin(admin.ModelAdmin):
    list_display = ('siteID', 'responseTime', 'timeRecorded')

admin.site.register(ResponseTime, ResponseTimesAdmin)