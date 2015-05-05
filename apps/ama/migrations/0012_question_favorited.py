# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ama', '0011_host_facebook_event_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='favorited',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
