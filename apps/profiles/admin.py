from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django import forms

class ProfileChangeForm(UserChangeForm):
	username = forms.CharField(required=False)
	class Meta:
		model = Profile
		fields = ('id', 'email', 'password', 'screen_name')

	def is_valid(self, *args, **kwargs):
		valid = super(ProfileChangeForm, self).is_valid(*args, **kwargs)
		return valid

class ProfileCreationForm(forms.ModelForm):

	class Meta:
		model = Profile
		fields = ('id', 'password', 'screen_name')

	def save(self, *args, **kwargs):
		p = super(ProfileCreationForm, self).save(commit=False)
		p.save()
		return p


@admin.register(Profile)
class ProfileAdmin(UserAdmin):
	form = ProfileChangeForm
	add_form = ProfileCreationForm
	# The forms to add and change user instances

	# The fields to be used in displaying the User model.
	# These override the definitions on the base UserAdmin
	# that reference specific fields on auth.User.
	list_display = ('id', 'screen_name')
	list_filter = ('is_superuser','is_staff')
	fieldsets = (
		(None, {'fields': ('email', 'password', 'screen_name')}),
	)
	# add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
	# overrides get_fieldsets to use this attribute when creating a user.
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password', 'screen_name')}
		),
	)
	search_fields = ('email',)
	ordering = ('email',)
	filter_horizontal = ()