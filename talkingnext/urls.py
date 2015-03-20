from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.views import logout
from django.views.generic import TemplateView
from apps.ama.ajax import questions_view
from apps.ama.views import ama_view, ama_route
from apps.profiles.ajax import create_user_view, authenticate_user

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='landing.html')),
    url(r'^is/$', ama_route, name='talking_next_is'),
    url(r'^is/(?P<host>\w+)/$', ama_view),
    url(r'^ajax/questions/$', questions_view),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^ajax/create_user/$', create_user_view),
    url(r'^ajax/authenticate_user/$', authenticate_user),
    url(r'^logout/$', logout, name='logout', kwargs={'next_page': '/'})
)