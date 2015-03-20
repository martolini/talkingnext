from django_ajax.decorators import ajax
from .models import Profile
from django.contrib import auth
from .forms import ProfileCreationForm

@ajax
def create_user_view(request):
	if request.user.is_authenticated():
		return {'authenticated': False}
	form = ProfileCreationForm(request.POST)
	if form.is_valid():
		p = form.save()
		user = auth.authenticate(username=request.POST.get('email'), password=request.POST.get('password'))
		if user is not None:
			auth.login(request, user)
			return {'authenticated': True, 'displayName': request.user.get_full_name()}
	else:
		print form.errors
	return {'authenticated': False}


@ajax
def authenticate_user(request):
	if request.user.is_authenticated():
		return {'authenticated': True, 'displayName': request.user.get_full_name()}
	if request.POST:
		user = auth.authenticate(username=request.POST.get('email'), password=request.POST.get('password'))
		if user is not None:
			auth.login(request, user)
			return {'authenticated': True, 'displayName': request.user.get_full_name()}
		return {'authenticated': False}
	return {'authenticated': False}