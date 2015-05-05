var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var QuestionStoreMixin = require('../mixins/QuestionStoreMixin');

module.exports = Reflux.createStore({
	mixins: [QuestionStoreMixin],
	listenables: [QuestionActions],


	onInitialIncomingQuestions: function(questions) {
		this.questions = questions;
		this.triggerSortedQuestions();
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
	},
})