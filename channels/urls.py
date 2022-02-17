from django.urls import path
from .views import ChannelsListAPIView

app_name = 'ChannelsDisplay'

urlpatterns = [
    path('',ChannelsListAPIView.as_view(), name='channels')
]