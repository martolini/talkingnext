from django.contrib import admin
from .models import Host, Question, Subscriber, Suggestion, Vote

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
	list_display = ('email', 'host')

@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
	list_display = ('name', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ('id', 'short_text', 'host', 'current_question', 'author' ,'votes_count')
	list_filter = ('host__startup',)

@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
	list_display = ('host', 'votes')