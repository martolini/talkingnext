"""
Django settings for talkingnext project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '74*ks=+)pb5ib!1+&19l7!dwf%0pt)+yx%d2p_%-_5s0d%0a3p'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'apps.ama',
    'apps.profiles',

    'django_ajax',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'talkingnext.urls'

WSGI_APPLICATION = 'talkingnext.wsgi.application'

TEMPLATE_DIRS = (os.path.join(BASE_DIR, 'templates'),)
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

import dj_database_url
DATABASES = {}
DATABASES['default'] =  dj_database_url.config(default='sqlite:///%s' % (os.path.join(BASE_DIR, 'db.sqlite3')))
# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
STATIC_ROOT = 'staticfiles'

AUTH_USER_MODEL = 'profiles.Profile'