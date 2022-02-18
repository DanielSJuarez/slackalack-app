from django.shortcuts import render
from rest_framework import generics
from .models import ChannelDisplay
from .serializers import ChannelsSerializers


# Create your views here.

class ChannelsListAPIView(generics.ListAPIView):
    queryset = ChannelDisplay.objects.all()
    serializer_class = ChannelsSerializers

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
