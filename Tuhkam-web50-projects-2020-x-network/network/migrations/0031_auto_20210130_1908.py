# Generated by Django 3.0.8 on 2021-01-30 17:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0030_auto_20210130_1748'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.AddField(
            model_name='post',
            name='liker',
            field=models.ManyToManyField(related_name='who_liked', to=settings.AUTH_USER_MODEL),
        ),
    ]
