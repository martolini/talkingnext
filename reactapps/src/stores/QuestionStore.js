var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var QuestionUtils = require('../utils/QuestionUtils');

var _questions = {};
var _hostId = null;
var _authenticated = false;

function _getQuestionList() {
	var questions = [];
	for (var _id in _questions) {
		questions.push(_questions[_id]);
	}
	questions.sort(function(a, b) {
		if (a.currentQuestion != b.currentQuestion) {
			return b.currentQuestion - a.currentQuestion;
		}
		if (a.answered == b.answered)
			return b.createdAt - a.createdAt;
		return a.answered - b.answered;
	});
	return questions;
}

var QuestionStore = Reflux.createStore({
	listenables: QuestionActions,

	onPostQuestion: function(text) {
		mixpanel.people.increment("Questions asked");
		$.post('/ajax/questions/', {'text': text, 'host_id': _hostId});
	},

	onVoteQuestion: function(question) {
		_questions[question.id].votes.push(UserStore.getUserId());
		this.trigger(_getQuestionList());
		$.post('/ajax/vote_question/', {'question_id': question.id});
	},

	onUnVoteQuestion: function(question) {
		_questions[question.id].votes.splice(_questions[question.id].votes.indexOf(UserStore.getUserId()), 1);
		this.trigger(_getQuestionList());
		$.post('/ajax/unvote_question/', {'question_id': question.id, 'profile_id': UserStore.getUserId()});
	},

	onNewQuestion: function(question) {
		question = QuestionUtils.convertRawQuestion(question);
		_questions[question.id] = question;
		this.trigger(_getQuestionList());
	},

	onEditQuestion: function(questionId, text) {
		_questions[questionId].text = text;
		$.post('/ajax/questions/', {'question_id': questionId, 'text': text});
	},

	onNewVote: function(vote) {
		if (vote.profile_id != UserStore.getUserId()) {
			_questions[vote.question_id].votes.push(vote.profile_id);
			this.trigger(_getQuestionList());
		}
	},

	onDeletetedVote: function(vote) {
		votes = _questions[vote.question_id].votes;
		if (vote.profile_id != UserStore.getUserId()) {
			var removed = votes.splice(votes.indexOf(vote.profile_id), 1);
			this.trigger(_getQuestionList());
		}
	},

	onQuestionChanged: function(question) {
		question = QuestionUtils.convertRawQuestion(question);
		_questions[question.id] = question;
		this.trigger(_getQuestionList());
	},

	onGetInitialData: function() {
		var self = this;
		$.get('/ajax/questions/', function(data) {
			if (data.content.screen_name)
				UserActions.setScreenName(data.content.screen_name, data.content.id);
			_hostId = data.content.host_id;
			var questions = {};
			data.content.questions.forEach(function(rawQuestion) {
				question = QuestionUtils.convertRawQuestion(rawQuestion);
				questions[question.id] = question;
			});
			_questions = questions
			self.trigger(_getQuestionList());
			pusher = new Pusher('0171d23077dc46bdf230');
			questionchannel = pusher.subscribe('h_' + _hostId);
			questionchannel.bind('new_question', self.onNewQuestion);
			questionchannel.bind('new_vote', self.onNewVote);
			questionchannel.bind('deleted_vote', self.onDeletetedVote);
			questionchannel.bind('question_changed', self.onQuestionChanged);
		});
	}
});

module.exports = QuestionStore;