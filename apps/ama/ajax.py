from django.shortcuts import render
from django_ajax.decorators import ajax
from django.core import serializers
from .models import Host, Question, Subscriber, Vote
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
@ajax
def questions_view(request):
	if request.POST:
		text = request.POST.get('text')
		host_id = request.POST.get('host_id')
		q = Question.objects.create(author=request.user, text=text, host_id=host_id)
		return {}
	if request.user.is_authenticated():
		displayname = request.user.get_full_name()
	else:
		displayname = None
	host = Host.objects.get(is_current=True)
	return {'questions': host.get_all_questions(), 'displayName': displayname, 'host_id': host.pk }

@ajax
def save_spot_view(request):
	email = request.POST.get('email')
	host = Host.objects.get(is_current=True)
	sub, created = Subscriber.objects.get_or_create(email=email, host=host)
	return {'success': True}


@ajax
def subscribe_view(request):
	sub, created = Subscriber.objects.get_or_create(email=request.POST.get('email'), host=Host.objects.get(is_current=True))
	return {'success': True}

@ensure_csrf_cookie
@ajax
def vote_question_view(request):
	vote, created = Vote.objects.get_or_create(question_id=request.POST.get('question_id'), profile_id=request.user.id)
	return {'success': True}
