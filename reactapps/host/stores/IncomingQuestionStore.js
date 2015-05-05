var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

module.exports = Reflux.createStore({
	listenables: [QuestionActions],

	init: function() {
		this.questions = [];
	},

	onInitialIncomingQuestions: function(questions) {
		this.questions = questions;
		this.triggerSortedQuestions();
	},

	triggerSortedQuestions: function() {
		this.questions.sort(function(a, b) {
			return b.createdAt - a.createdAt;
		});
		this.trigger(this.questions);
	},

	onNewIncomingQuestion: function(question) {
		this.questions.unshift(question);
		this.trigger(this.questions);
	},

	onFavoriteQuestion: function(question) {
		var index = this.questions.indexOf(question);
		this.questions.splice(index, 1);
		this.triggerSortedQuestions();
		$.post('/ajax/favorite_question/', {'question_id': question.id});
	}
})