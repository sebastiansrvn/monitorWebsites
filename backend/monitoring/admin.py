from django.contrib import admin
from .models import Site

# Register your models here.
class SiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'siteName', 'description', 'siteLink')

admin.site.register(Site, SiteAdmin)