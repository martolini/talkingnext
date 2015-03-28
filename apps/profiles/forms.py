from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class ProfileCreationForm(forms.ModelForm):
	display_name = forms.CharField(required=False)
	class Meta:
		model = Profile
		fields = ('display_name', 'email', 'password')

	def save(self, *args, **kwargs):
		p = Profile.objects.create_user(
			email=self.cleaned_data['email'],
			password=self.cleaned_data['password'], 
			display_name=self.cleaned_data['display_name'])
		return p