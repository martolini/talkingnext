from django.shortcuts import render, redirect, get_object_or_404
from .models import Host, Question
from django.contrib.auth.decorators import login_required
from django.db.models import Count

def ama_view(request, startup):
	if not Host.objects.filter(startup__iexact=startup):
		return ama_route(request)
	return render(request, 'ama/ama.html', {'host': Host.objects.get(startup__iexact=startup)})

from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def ama_route(request):
	host = Host.get_current_host()
	return redirect(host)

@login_required
def archive_view(request):
	return render(request, 'ama/archive.html', {'hosts': Host.objects.filter(is_current=False).order_by('-start_time')})

@login_required
def past_session_view(request, startup):
	try:
		host = Host.objects.get(startup__iexact=startup)
	except Host.DoesNotExist:
		return ama_route(request)
	return render(request, 'ama/past_session.html', {
		'host': host,
		'questions': host.questions.all().annotate(num_votes=Count('votes')).order_by('-num_votes')})

def host_view(request):
	return render(request, 'ama/host.html', {'host': Host.get_current_host()})