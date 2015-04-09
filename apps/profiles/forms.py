from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class ProfileCreationForm(forms.ModelForm):
	class Meta:
		model = Profile
		fields = ('screen_name', 'twitter_id', 'avatar')

	def save(self, *args, **kwargs):
		p = Profile.objects.create_user(
			twitter_id=self.cleaned_data['twitter_id'],
			screen_name=self.cleaned_data['screen_name'],
			avatar=self.cleaned_data['avatar'],
			)
		return p