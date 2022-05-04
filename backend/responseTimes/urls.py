from django.urls import path, include
from rest_framework import routers
from .api import ResponseTimeView

router = routers.DefaultRouter()
router.register('api/responseTimes', ResponseTimeView, 'responseTImes')
urlpatterns = router.urls