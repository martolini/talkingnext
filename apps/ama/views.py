from django.shortcuts import render, redirect
from .models import Host, Question

def ama_view(request, host):
	if not Host.objects.filter(name__iexact=host):
		return ama_route(request)
	return render(request, 'ama/ama.html')

def ama_route(request):
	host = Host.objects.get(is_current=True)
	return redirect(host)