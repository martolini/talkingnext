from django_ajax.decorators import ajax
from .models import Profile
from django.contrib import auth
from .forms import ProfileCreationForm
from django.conf import settings

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
			return {'authenticated': True, 'displayName': request.user.get_full_name(), 'id': p.pk, 'email': p.email}
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
			return {'authenticated': True, 'displayName': request.user.get_full_name(), 'id': p.pk}
		return {'authenticated': False}
	return {'authenticated': False}

@ajax
def create_or_login_view(request):
	if not request.POST:
		return {}
	id = request.POST.get('id')
	screen_name = request.POST.get('screen_name')
	avatar = request.POST.get('avatar')
	try:
		p = Profile.objects.get(id=request.POST.get('id'))
		created = False
	except Profile.DoesNotExist:
		p = Profile.objects.create_user(id=id, screen_name=screen_name, avatar=avatar)
		created = True
	user = auth.authenticate(username=id, password=settings.SECRET_PASSWORD)
	if user is not None:
		auth.login(request, user)
		return {'authenticated': True, 'screen_name': p.screen_name, 'avatar': p.avatar, 'created': False, 'id': p.id}
	return {'authenticated': False}