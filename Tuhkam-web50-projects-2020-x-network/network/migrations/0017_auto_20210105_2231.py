# Generated by Django 3.0.8 on 2021-01-05 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0016_auto_20210105_2223'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follower',
            old_name='following',
            new_name='following1',
        ),
        migrations.RenameField(
            model_name='follower',
            old_name='username',
            new_name='username1',
        ),
    ]