from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile
from django.contrib.auth.forms import UserChangeForm
from django import forms

class ProfileChangeForm(UserChangeForm):
	username = forms.CharField(required=False)
	class Meta:
		model = Profile
		fields = ('email', 'password', 'display_name')

	def is_valid(self, *args, **kwargs):
		valid = super(ProfileChangeForm, self).is_valid(*args, **kwargs)
		print self._errors
		return valid

@admin.register(Profile)
class ProfileAdmin(UserAdmin):
	form = ProfileChangeForm
	# The forms to add and change user instances

	# The fields to be used in displaying the User model.
	# These override the definitions on the base UserAdmin
	# that reference specific fields on auth.User.
	list_display = ('email', 'display_name')
	list_filter = ('is_superuser','is_staff')
	fieldsets = (
		(None, {'fields': ('email', 'password', 'display_name')}),
	)
	# add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
	# overrides get_fieldsets to use this attribute when creating a user.
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password',)}
		),
	)
	search_fields = ('email',)
	ordering = ('email',)
	filter_horizontal = ()