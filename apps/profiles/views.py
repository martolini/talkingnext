from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def login_view(request):
	next = request.GET.get('next', '/profile/')
	return render(request, 'profiles/login.html', {'next': next})

@login_required
def profile_view(request):
	if request.POST:
		profile = request.user
		profile.email = request.POST.get('email', '')
		profile.save()
	return render(request, 'profiles/profile.html', {'profile': request.user})