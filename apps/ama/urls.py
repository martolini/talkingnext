from django.conf.urls import patterns, include, url
from .views import ama_view, ama_route, archive_view, past_session_view, host_view
from .ajax import questions_view, save_spot_view, subscribe_view, vote_question_view, \
						unvote_question_view, talkingnext_view, favorite_question_view, \
						answer_question_view

viewpatterns = patterns('apps.ama.views',
	url(r'^is/$', ama_route, name='talking_next_is'),
	url(r'^is/(?P<startup>\w+)/$', ama_view),
	url(r'^archive/$', archive_view, name='archive'),
	url(r'^archive/(?P<startup>\w+)/$', past_session_view, name='past_session'),
	url(r'^host/$', host_view, name='host_view'),
)

ajaxpatterns = patterns('apps.ama.ajax',
	url(r'^ajax/questions/$', questions_view),
	url(r'^ajax/save_spot/$', save_spot_view),
	url(r'^ajax/subscribe/$', subscribe_view),
    url(r'^ajax/vote_question/$', vote_question_view),
    url(r'^ajax/unvote_question/$', unvote_question_view),
    url(r'^ajax/talkingnext/$', talkingnext_view),
    url(r'^ajax/favorite_question/$', favorite_question_view),
    url(r'^ajax/answer_question/$', answer_question_view),
)

urlpatterns = viewpatterns + ajaxpatterns