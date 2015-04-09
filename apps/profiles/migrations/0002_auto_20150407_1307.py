# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='display_name',
            new_name='screen_name',
        ),
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.URLField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.BigIntegerField(unique=True, serialize=False, primary_key=True),
            preserve_default=True,
        ),
    ]
