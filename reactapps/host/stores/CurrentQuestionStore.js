var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

module.exports = Reflux.createStore({
	listenables: [QuestionActions],
	init: function() {
		this.currentQuestion = null;
	},

	setInitial: function(question) {
		this.currentQuestion = question;
	},

	onCurrentQuestion: function(question) {
		if (this.currentQuestion != null) {
			QuestionActions.answerQuestion(this.currentQuestion)
		}
		this.currentQuestion = question;
		this.trigger(this.currentQuestion);
		if (this.currentQuestion != null) {
			$.post('/ajax/current_question/', {'question_id': question.id});
		}
	}
});