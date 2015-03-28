from django.shortcuts import render, redirect, get_object_or_404
from .models import Host, Question
from django.contrib.auth.decorators import login_required

def ama_view(request, host):
	if not Host.objects.filter(name__iexact=host):
		return ama_route(request)
	return render(request, 'ama/ama.html')


from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def ama_route(request):
	host = Host.objects.get(is_current=True)
	return redirect(host)

@login_required
def archive_view(request):
	return render(request, 'ama/archive.html')

@login_required
def past_session_view(request, host):
	try:
		host = Host.objects.get(name__iexact=host)
	except Host.DoesNotExist:
		return ama_route(request)
	return render(request, 'ama/past_session.html', {'host': host})