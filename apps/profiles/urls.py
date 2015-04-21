from django.conf.urls import patterns, include, url
from django.contrib.auth.views import logout
from .ajax import create_or_login_view
from .views import login_view, profile_view

viewpatterns = patterns('apps.profiles.views',
    url(r'^logout/$', logout, name='logout', kwargs={'next_page': '/'}),
    url(r'^login/$', login_view, name='login'),
    url(r'^profile/$', profile_view, name='profile'),
)

ajaxpatterns = patterns('apps.profiles.ajax', 
    url(r'^ajax/login/', create_or_login_view),
)

urlpatterns = viewpatterns + ajaxpatterns