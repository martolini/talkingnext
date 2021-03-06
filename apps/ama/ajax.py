from django.shortcuts import render
from django_ajax.decorators import ajax
from django.core import serializers
from .models import Host, Question, Subscriber, Vote, Suggestion
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

@ajax
def questions_view(request):
	if request.POST:
		question_id = request.POST.get('question_id', None)
		if question_id:
			q = Question.objects.get(id=question_id)
			q.text = request.POST.get('text');
			q.save()
			return {}
		else:
			text = request.POST.get('text')
			host_id = request.POST.get('host_id')
			try:
				q = Question.objects.create(author=request.user, text=text, host_id=host_id)
			except Exception, e:
				import traceback; traceback.print_exc();
			return {}
	if request.user.is_authenticated():
		screen_name = request.user.screen_name;
	else:
		screen_name = None
	host = Host.get_current_host()
	return {'questions': host.get_all_questions(), 'screen_name': screen_name, 'host_id': host.pk, 'id': request.user.id }

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

@ajax
def vote_question_view(request):
	vote, created = Vote.objects.get_or_create(question_id=request.POST.get('question_id'), profile_id=request.user.id)
	return {'success': True}

@ajax
def unvote_question_view(request):
	Vote.objects.get(question_id=request.POST.get('question_id'), profile_id=request.POST.get('profile_id')).delete()
	return {'success': True}

@ajax
def talkingnext_view(request):
	Suggestion.create_or_increment(request.POST.get('host'))
	return {'success': True}

@ajax
def favorite_question_view(request):
	question_id = request.POST.get('question_id')
	question = Question.objects.get(id=question_id)
	question.favorited = True
	question.save()
	return {'success': True}

@ajax
def answer_question_view(request):
	question_id = request.POST.get('question_id')
	question = Question.objects.get(id=question_id)
	question.answered = not question.answered
	question.save()
	return {'success': True}

@ajax
def current_question_view(request):
	question_id = request.POST.get('question_id')
	try:
		for q in Question.objects.filter(current_question=True):
			q.current_question = False
			q.save()
	except Question.DoesNotExist:
		pass
	q = Question.objects.get(id=question_id)
	q.current_question = True
	q.save()
	return {'success': True}