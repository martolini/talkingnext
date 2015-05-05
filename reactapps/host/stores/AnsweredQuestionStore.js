var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var QuestionStoreMixin = require('../mixins/QuestionStoreMixin');

module.exports = Reflux.createStore({
	mixins: [QuestionStoreMixin],
	listenables: [QuestionActions],

	onInitialAnsweredQuestions: function(questions) {
		this.questions = questions;
		this.triggerSortedQuestions();
	},

	onAnswerQuestion: function(question) {
		question.answered = true;
		this.questions.push(question);
		this.triggerSortedQuestions();
	},

	onUnAnswerQuestion: function(question) {
		console.log("WHAT");
		var index = this.questions.indexOf(question);
		this.questions.splice(index, 1);
		this.triggerSortedQuestions();
		$.post('/ajax/answer_question/', {question_id: question.id});
	}
});