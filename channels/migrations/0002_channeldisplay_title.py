# Generated by Django 3.2.12 on 2022-02-17 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='channeldisplay',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
