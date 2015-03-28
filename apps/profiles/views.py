from django.shortcuts import render, redirect
from django.contrib import auth
from .forms import ProfileCreationForm

def login_view(request):
	if request.POST:
		form_type = request.POST.get('form-type')
		if form_type == 'login':
			email = request.POST.get('email')
			password = request.POST.get('password')
			user = auth.authenticate(username=email, password=password)
			if user is not None:
				auth.login(request, user)
				if request.GET.get('next') is not None:
					return redirect(request.GET.get('next'))
		elif form_type == 'register':
			form = ProfileCreationForm(request.POST)
			if form.is_valid():
				profile = form.save()
				user = auth.authenticate(username=profile.email, password=request.POST.get('password'))
				if user is not None:
					auth.login(request, user)
	return render(request, 'profiles/login.html')
