from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class ProfileManager(BaseUserManager):
	def create_user(self, email, password, **extra_fields):
		if not email:
			raise ValueError('Profile needs an email address')
		user = self.model(
			email=self.normalize_email(email),
			**extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password):
		user = self.create_user(email,
			password=password,
			is_superuser=True,
			is_staff=True)
		user.save(using=self._db)
		return user

class Profile(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(max_length=255, unique=True)
	display_name = models.CharField(max_length=30, blank=True, null=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	USERNAME_FIELD = 'email'

	objects = ProfileManager()

	def get_full_name(self):
		return self.display_name or self.email

	def get_short_name(self):
		return self.get_full_name()

	def __unicode__(self):
		return self.get_full_name()
