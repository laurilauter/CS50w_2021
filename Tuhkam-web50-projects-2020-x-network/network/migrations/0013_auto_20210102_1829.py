# Generated by Django 3.0.8 on 2021-01-02 16:29

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0012_auto_20210102_1826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='following',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]