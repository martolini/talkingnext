# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20150407_1317'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='twitter_id',
            field=models.BigIntegerField(default=2, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True),
            preserve_default=True,
        ),
    ]
