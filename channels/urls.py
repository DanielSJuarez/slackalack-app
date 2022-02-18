from django.urls import path
from .views import ChannelsListAPIView, MessageList, MessageListDetails

app_name = 'ChannelsDisplay'

urlpatterns = [
    path('<int:channel>/messages/<int:pk>/', MessageListDetails.as_view()),
    path('<int:channel>/messages/', MessageList.as_view(), name = 'channel_messages'),
    path('', ChannelsListAPIView.as_view(), name='channels')
]
