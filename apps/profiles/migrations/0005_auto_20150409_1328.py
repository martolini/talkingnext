# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20150409_1131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='screen_name',
            field=models.CharField(default='martin', unique=True, max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='profile',
            name='twitter_id',
            field=models.BigIntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
