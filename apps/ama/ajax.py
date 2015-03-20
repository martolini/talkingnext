from django.shortcuts import render
from django_ajax.decorators import ajax
from django.core import serializers
from .models import Host, Question
from django.contrib.auth.decorators import login_required

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