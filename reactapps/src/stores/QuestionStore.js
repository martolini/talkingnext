var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var UserActions = require('../actions/UserActions');
var QuestionUtils = require('../utils/QuestionUtils');

var _questions = {};
var _hostId = null;

function _getQuestionList() {
	var questions = [];
	for (var _id in _questions) {
		questions.push(_questions[_id]);
	}
	questions.sort(function(a, b) {
		if (a.votes == b.votes)
			return b.created_at - a.created_at;
		return b.votes - a.votes;
	});
	return questions;
}

var QuestionStore = Reflux.createStore({
	listenables: QuestionActions,

	onPostQuestion: function(text) {
		mixpanel.people.increment("Questions asked");
		$.post('/ajax/questions/', {'text': text, 'host_id': _hostId});
	},

	onVoteQuestion: function(question_id) {
		$.post('/ajax/vote_question/', {'question_id': question_id});
	},

	onNewQuestion: function(question) {
		question = QuestionUtils.convertRawQuestion(question);
		_questions[question.id] = question;
		this.trigger(_getQuestionList());
	},

	onGetInitialData: function() {
		var self = this;
		$.get('/ajax/questions/', function(data) {
			if (data.content.displayName)
				UserActions.didAuthenticate(data.content.displayName, data.content.uid);
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
		});
	}
});

module.exports = QuestionStore;