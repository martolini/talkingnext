from django.shortcuts import render
from apps.ama.models import Host

def landing_view(request):
	previous = Host.get_previous_host()
	current = Host.get_current_host()
	return render(request, 'landing.html', dict(previous=previous, current=current))

