from django.shortcuts import render, redirect
from django.contrib import auth
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from .models import Profile
from .forms import ProfileCreationForm
from django.contrib import messages

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
				return redirect(reverse('archive'))
		elif form_type == 'register':
			form = ProfileCreationForm(request.POST)
			if form.is_valid():
				profile = form.save()
				user = auth.authenticate(username=profile.email, password=request.POST.get('password'))
				if user is not None:
					auth.login(request, user)
					return redirect('/')
	return render(request, 'profiles/login.html')

@login_required
def profile_view(request):
	if request.POST:
		profile = request.user
		profile.email = request.POST.get('email', '')
		profile.save()
		messages.success(request, "Email successfully changed")
	return render(request, 'profiles/profile.html', {'profile': request.user})