# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ama', '0009_auto_20150412_0854'),
    ]

    operations = [
        migrations.RenameField(
            model_name='host',
            old_name='time',
            new_name='end_time',
        ),
        migrations.RenameField(
            model_name='host',
            old_name='description',
            new_name='post_description',
        ),
        migrations.AddField(
            model_name='host',
            name='pre_description',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='host',
            name='start_time',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
