# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ama', '0010_auto_20150417_1012'),
    ]

    operations = [
        migrations.AddField(
            model_name='host',
            name='facebook_event_url',
            field=models.URLField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
