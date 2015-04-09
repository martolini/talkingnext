from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class ProfileCreationForm(forms.ModelForm):
	screen_name = forms.CharField(required=False)
	class Meta:
		model = Profile
		fields = ('screen_name', 'email', 'password')

	def save(self, *args, **kwargs):
		p = Profile.objects.create_user(
			email=self.cleaned_data['email'],
			password=self.cleaned_data['password'], 
			screen_name=self.cleaned_data['screen_name'])
		return p