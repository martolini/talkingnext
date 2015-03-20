from django.contrib import admin
from .models import Host, Question

@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
	list_display = ('name', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ('id', 'host')