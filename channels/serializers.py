from rest_framework import serializers
from .models import ChannelDisplay, Message


class ChannelsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ChannelDisplay
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta: 
        model = Message
        fields = ('text', 'channel', 'username')
        