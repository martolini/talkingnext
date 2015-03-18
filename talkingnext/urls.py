from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'talkathon.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', TemplateView.as_view(template_name='landing.html')),
    url(r'^funrun/$', TemplateView.as_view(template_name='ama/ama.html')),
    url(r'^host/$', TemplateView.as_view(template_name='ama/host.html')),
    url(r'^admin/', include(admin.site.urls)),
)