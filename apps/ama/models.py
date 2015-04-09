from django.db import models
from apps.profiles.models import Profile
from django.db.models.signals import post_save
from django.db.models import F
import time
import json

class Host(models.Model):
	name = models.CharField(max_length=50)
	startup = models.CharField(max_length=50, blank=True, null=True)
	time = models.DateTimeField(blank=True, null=True)
	is_current = models.BooleanField(default=False)
	title = models.CharField(max_length=200)
	video_url = models.URLField(blank=True, null=True)
	image_url = models.URLField(blank=True, null=True)
	description = models.TextField(blank=True, null=True)

	def get_all_questions(self):
		return [question.as_json() for question in self.questions.all().select_related('author')]

	def get_absolute_url(self):
		return '/is/%s' % self.startup.lower()

	def __unicode__(self):
		return self.name

class Question(models.Model):
	text = models.TextField()
	author = models.ForeignKey(Profile, related_name='questions')
	host = models.ForeignKey(Host, related_name='questions')
	created_at = models.DateTimeField(auto_now_add=True)
	answered = models.BooleanField(default=False)
	current_question = models.BooleanField(default=False)

	@property
	def votes_count(self):
		return self.votes.count()

	@property
	def short_text(self):
		return self.text[:15]

	def as_json(self):
		return dict(
			id=self.id,
			text=self.text,
			author=self.author.get_full_name(),
			votes=json.dumps(list(self.votes.all().values_list('profile_id', flat=True))),
			avatar=self.author.avatar,
			created_at=time.mktime(self.created_at.timetuple()),
			answered=self.answered,
			current_question=self.current_question,
			)

	def __unicode__(self):
		return self.text[:15]

import pusher
p = pusher.Pusher(
  app_id='112189',
  key='0171d23077dc46bdf230',
  secret='925188859f394647a793'
)

def push_question_after_creation(sender, instance, created, **kwargs):
	if created:
		p['h_{}'.format(instance.host_id)].trigger('new_question', instance.as_json())
	else:
		p['h_{}'.format(instance.host_id)].trigger('question_changed', instance.as_json())

post_save.connect(push_question_after_creation, sender=Question)

class Comment(models.Model):
	text = models.TextField()
	author = models.ForeignKey(Profile, related_name='comments')
	question = models.ForeignKey(Question, related_name='comments')


class Subscriber(models.Model):
	email = models.EmailField()
	host = models.ForeignKey(Host, related_name='subscribers')

	def __unicode__(self):
		return self.email


class Vote(models.Model):
	profile = models.ForeignKey(Profile, related_name='+')
	question = models.ForeignKey(Question, related_name='votes')

	def as_json(self):
		return dict(
			profile_id=self.profile.id,
			question_id=self.question.id
			)

def push_vote_after_creation(sender, instance, created, **kwargs):
	if created:
		p['h_{}'.format(instance.question.host_id)].trigger('new_vote', instance.as_json());

post_save.connect(push_vote_after_creation, sender=Vote)

class Suggestion(models.Model):
	host = models.CharField(max_length=100)
	votes = models.PositiveIntegerField(default=1)

	@classmethod
	def create_or_increment(cls, host):
		host = host.lower().strip()
		if cls.objects.filter(host=host).exists():
			cls.objects.filter(host=host).update(votes=F('votes')+1)
		else:
			cls.objects.create(host=host)