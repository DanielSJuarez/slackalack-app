from django.urls import path, include

from channels.views import ChannelsListAPIView

app_name = 'api'

urlpatterns = [
    path('channels/', include('channels.urls', namespace = 'channels'))
]