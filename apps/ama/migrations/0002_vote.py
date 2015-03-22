# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ama', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('profile', models.ForeignKey(related_name='+', to=settings.AUTH_USER_MODEL)),
                ('question', models.ForeignKey(related_name='votes', to='ama.Question')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
