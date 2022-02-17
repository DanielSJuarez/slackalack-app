from django.db import models
from django.conf import settings
from django.forms import CharField

# Create your models here.
class ChannelDisplay(models.Model):
    channel = models.CharField(max_length=255, null=True)
    text = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
       return  self.title