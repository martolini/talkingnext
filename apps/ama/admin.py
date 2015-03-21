from django.contrib import admin
from .models import Host, Question, Subscriber

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
	list_display = ('email', 'host')

@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
	list_display = ('name', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ('id', 'host')