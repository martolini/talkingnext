from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class ProfileManager(BaseUserManager):
	def create_user(self, id, screen_name, **extra_fields):
		if not id:
			raise ValueError('Profile needs an unique ID')
		user = self.model(
			id=id,
			screen_name=screen_name,
			**extra_fields)
		if 'password' in extra_fields:
			user.set_password(extra_fields['password'])
		else:
			user.set_password(settings.SECRET_PASSWORD)
		user.save(using=self._db)
		return user

	def create_superuser(self, id, password):
		user = self.create_user(id,
			password=password,
			screen_name='admin',
			email='admin@admin.no',
			is_superuser=True,
			is_staff=True)
		user.save(using=self._db)
		return user

class Profile(AbstractBaseUser, PermissionsMixin):
	id = models.BigIntegerField(primary_key=True, unique=True)
	email = models.EmailField(max_length=255)
	screen_name = models.CharField(max_length=30, blank=True, null=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	avatar = models.URLField(blank=True, null=True)
	USERNAME_FIELD = 'id'

	objects = ProfileManager()

	def get_full_name(self):
		return self.screen_name or self.email

	def get_short_name(self):
		return self.get_full_name()

	def __unicode__(self):
		return self.get_full_name()
