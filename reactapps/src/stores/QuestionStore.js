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
		_questions[question.id].hasVoted = true;
		_questions[question.id].votes.push(UserStore.getUserId());
		_questions[question.id].votesCount += 1;
		this.trigger(_getQuestionList());
		$.post('/ajax/vote_question/', {'question_id': question.id});
	},

	onNewQuestion: function(question) {
		question = QuestionUtils.convertRawQuestion(question);
		_questions[question.id] = question;
		this.trigger(_getQuestionList());
	},

	onNewVote: function(vote) {
		if (vote.profile_id != UserStore.getUserId()) {
			_questions[vote.question_id].votes.push(vote.profile_id);
			_questions[vote.question_id].votesCount++;
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
			questionchannel.bind('question_changed', self.onQuestionChanged);
		});
	}
});

module.exports = QuestionStore;