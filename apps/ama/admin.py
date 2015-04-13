from django.contrib import admin
from .models import Host, Question, Subscriber, Suggestion, Vote
from django.db.models import F

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
	list_display = ('email', 'host')

@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
	list_display = ('name', )

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

	def toggle_current_question(self, request, queryset):
		for a in queryset:
			if a.current_question:
				a.current_question = False
				a.answered = True
			else:
				a.current_question = True
			a.save()

	def mark_as_answered(self, request, queryset):
		queryset.update(answered=True)

	list_display = ('short_text', 'host', 'current_question', 'answered', 'author' ,'votes_count')
	list_filter = ('host__startup',)
	actions = (toggle_current_question, mark_as_answered)

@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
	list_display = ('host', 'votes')