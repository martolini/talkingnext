from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from apps.landing.views import landing_view

urlpatterns = patterns('',
    url(r'^$', landing_view, name="landing"),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^redirect/$', TemplateView.as_view(template_name='redirect.html'), name='redirect'),
    url(r'^', include('apps.ama.urls')),
    url(r'^', include('apps.profiles.urls')),
)