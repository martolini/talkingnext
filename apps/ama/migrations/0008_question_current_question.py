# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ama', '0007_question_answered'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='current_question',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
