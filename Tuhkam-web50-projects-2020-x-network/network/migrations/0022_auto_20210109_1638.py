# Generated by Django 3.0.8 on 2021-01-09 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0021_auto_20210109_1636'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follower',
            old_name='username',
            new_name='user',
        ),
    ]
