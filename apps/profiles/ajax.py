from django_ajax.decorators import ajax
from .models import Profile
from django.contrib import auth
from .forms import ProfileCreationForm
from django.conf import settings

@ajax
def create_or_login_view(request):
	if not request.POST:
		return {}
	twitter_id = request.POST.get('twitter_id')
	try:
		p = Profile.objects.get(twitter_id=twitter_id)
		created = False
	except Profile.DoesNotExist:
		form = ProfileCreationForm(request.POST)
		if form.is_valid():
			p = form.save()
			created = True
		else:
			print form.errors
	user = auth.authenticate(username=p.screen_name, password=settings.SECRET_PASSWORD)
	if user is not None:
		auth.login(request, user)
		return {'authenticated': True, 'screen_name': p.screen_name, 'avatar': p.avatar, 'created': False, 'id': p.twitter_id}
	return {'authenticated': False}