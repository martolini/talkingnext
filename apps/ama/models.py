from django.db import models
from apps.profiles.models import Profile
from django.db.models.signals import post_save
import time

class Host(models.Model):
	name = models.CharField(max_length=50)
	startup = models.CharField(max_length=50, blank=True, null=True)
	time = models.DateTimeField(blank=True, null=True)
	is_current = models.BooleanField(default=False)

	def get_all_questions(self):
		return [question.as_json() for question in self.questions.all().select_related('author')]

	def get_absolute_url(self):
		return '/is/%s' % self.name.lower()

	def __unicode__(self):
		return self.name

class Question(models.Model):
	text = models.TextField()
	author = models.ForeignKey(Profile, related_name='questions')
	host = models.ForeignKey(Host, related_name='questions')
	created_at = models.DateTimeField(auto_now_add=True)

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
			votes=self.votes_count,
			created_at=time.mktime(self.created_at.timetuple())
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

def push_vote_after_creation(sender, instance, created, **kwargs):
	if created:
		p['h_{}'.format(instance.question.host_id)].trigger('new_question', instance.question.as_json());

post_save.connect(push_vote_after_creation, sender=Vote)