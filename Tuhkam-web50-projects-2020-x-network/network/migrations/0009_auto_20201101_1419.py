# Generated by Django 3.0.8 on 2020-11-01 12:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_auto_20201024_2130'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.AddField(
            model_name='user',
            name='likes',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='liker', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
