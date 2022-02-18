from django.db import models
from django.conf import settings
from django.forms import CharField

# Create your models here.


class ChannelDisplay(models.Model):
    channel = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.channel


class Message(models.Model):
    text = models.TextField()
    channel = models.ForeignKey(ChannelDisplay, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.text
