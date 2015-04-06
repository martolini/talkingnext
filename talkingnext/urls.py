from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.views import logout
from django.views.generic import TemplateView
from apps.ama.ajax import questions_view, save_spot_view, subscribe_view, vote_question_view, talkingnext_view
from apps.ama.views import ama_view, ama_route, archive_view, past_session_view
from apps.profiles.ajax import create_user_view, authenticate_user
from apps.profiles.views import login_view

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name="landing"),
    url(r'^is/$', ama_route, name='talking_next_is'),
    url(r'^is/(?P<startup>\w+)/$', ama_view),
    url(r'^ajax/questions/$', questions_view),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^ajax/create_user/$', create_user_view),
    url(r'^ajax/authenticate_user/$', authenticate_user),
    url(r'^ajax/save_spot/$', save_spot_view),
    url(r'^ajax/subscribe/$', subscribe_view),
    url(r'^ajax/vote_question/$', vote_question_view),
    url(r'^ajax/talkingnext/$', talkingnext_view),
    url(r'^logout/$', logout, name='logout', kwargs={'next_page': '/'}),
    url(r'^login/$', login_view, name='login'),
    url(r'^archive/$', archive_view, name='archive'),
    url(r'^archive/(?P<startup>\w+)/$', past_session_view, name='past_session'),
)