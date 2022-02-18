from django.shortcuts import render
from rest_framework import generics
from .models import ChannelDisplay, Message
from .serializers import ChannelsSerializers, MessageSerializer


# Create your views here.

class ChannelsListAPIView(generics.ListAPIView):
    queryset = ChannelDisplay.objects.all()
    serializer_class = ChannelsSerializers


class MessageList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        '''
        This view should return a list of all reviews by the channel passed in the url
        '''

        channel = self.kwargs['channel']
        return Message.objects.filter(channel=channel)


class MessageListDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
