# Generated by Django 3.0.8 on 2021-01-17 11:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0027_auto_20210117_1257'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='likers',
            new_name='likes',
        ),
    ]