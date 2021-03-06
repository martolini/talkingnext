from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class ProfileManager(BaseUserManager):
	def create_user(self, screen_name, **extra_fields):
		user = self.model(
			screen_name=screen_name,
			**extra_fields)
		if 'password' in extra_fields:
			user.set_password(extra_fields['password'])
		else:
			user.set_password(settings.SECRET_PASSWORD)
		user.save(using=self._db)
		return user

	def create_superuser(self, screen_name, password):
		user = self.create_user(
			password=password,
			screen_name='admin',
			email='admin@admin.no',
			is_superuser=True,
			is_staff=True)
		user.save(using=self._db)
		return user

class Profile(AbstractBaseUser, PermissionsMixin):
	twitter_id = models.BigIntegerField(blank=True, null=True)
	email = models.EmailField(max_length=255)
	screen_name = models.CharField(max_length=30, unique=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	avatar = models.URLField(blank=True, null=True)
	USERNAME_FIELD = 'screen_name'

	objects = ProfileManager()

	def get_full_name(self):
		return self.screen_name or self.email

	def get_short_name(self):
		return self.get_full_name()

	def __unicode__(self):
		return self.get_full_name()
