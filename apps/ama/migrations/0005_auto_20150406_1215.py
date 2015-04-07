# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ama', '0004_host_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='host',
            name='image_url',
            field=models.URLField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='host',
            name='video_url',
            field=models.URLField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
