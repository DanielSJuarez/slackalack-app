from rest_framework import serializers
from .models import ChannelDisplay

class ChannelsSerializers(serializers.ModelSerializer):
    class Meta: 
        model = ChannelDisplay
        fields = '__all__'
