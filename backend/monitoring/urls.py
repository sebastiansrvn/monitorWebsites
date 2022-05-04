from django.urls import path, include
from rest_framework import routers
from .api import SiteView

router = routers.DefaultRouter()
router.register('api/sites', SiteView, 'sites')
urlpatterns = router.urls