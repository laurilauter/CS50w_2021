# Generated by Django 3.0.8 on 2021-01-09 14:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0017_auto_20210105_2231'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follower',
            old_name='following1',
            new_name='following',
        ),
        migrations.RenameField(
            model_name='follower',
            old_name='username1',
            new_name='username',
        ),
    ]
