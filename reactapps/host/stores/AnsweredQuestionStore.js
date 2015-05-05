var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

module.exports = Reflux.createStore({
	listenables: [QuestionActions],

	init: function() {
		this.questions = [];
	},

	onInitialAnsweredQuestions: function(questions) {
		this.questions = questions;
		this.triggerSortedQuestions();
	},

	triggerSortedQuestions: function() {
		this.questions.sort(function(a, b) {
			return b.createdAt - a.createdAt;
		});
		this.trigger(this.questions);
	},

	onAnswerQuestion: function(question) {
		question.answered = true;
		this.questions.push(question);
		this.triggerSortedQuestions();
	}
});