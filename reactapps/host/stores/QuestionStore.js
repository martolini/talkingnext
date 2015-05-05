var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var IncomingQuestionStore = require('./IncomingQuestionStore');
var FavoriteQuestionStore = require('./FavoriteQuestionStore');
var AnsweredQuestionStore = require('./AnsweredQuestionStore');
var QuestionUtils = require('../utils/QuestionUtils');
var CurrentQuestionStore = require('../stores/CurrentQuestionStore');

module.exports = Reflux.createStore({
	listenables: [QuestionActions],
	init: function() {
		this.questions = [];
		this.onFetchInitialData();
	},

	onFetchInitialData: function() {
		var self = this;
		$.get('/ajax/questions/', function(data) {
			var answeredQuestions = [];
			var incomingQuestions = [];
			var favoritedQuestions = [];
			data.content.questions.forEach(function(rawQuestion) {
				var question = QuestionUtils.convertRawQuestion(rawQuestion);
				if (question.answered)
					answeredQuestions.push(question);
				else if (question.favorited)
					favoritedQuestions.push(question);
				else
					incomingQuestions.push(question);
				if (question.currentQuestion) {
					CurrentQuestionStore.setInitial(question);
				}
			});
			self.questions = self.questions.concat(answeredQuestions, favoritedQuestions, incomingQuestions);
			QuestionActions.initialIncomingQuestions(incomingQuestions);
			QuestionActions.initialFavoritedQuestions(favoritedQuestions);
			QuestionActions.initialAnsweredQuestions(answeredQuestions);
		});
	},

	triggerQuestions: function() {

	},
})