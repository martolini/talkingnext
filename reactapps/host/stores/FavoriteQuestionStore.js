var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var QuestionStoreMixin = require('../mixins/QuestionStoreMixin');

module.exports = Reflux.createStore({
	mixins: [QuestionStoreMixin],
	listenables: [QuestionActions],

	onInitialFavoritedQuestions: function(questions) {
		this.questions = questions;
		this.triggerSortedQuestions();
	},

	onFavoriteQuestion: function(question) {
		question.favorited = true;
		this.questions.push(question);
		this.triggerSortedQuestions();
	},

	onAnswerQuestion: function(question) {
		var index = this.questions.indexOf(question);
		this.questions.splice(index, 1);
		this.triggerSortedQuestions();
		$.post('/ajax/answer_question/', {'question_id': question.id});
	},

	onUnAnswerQuestion: function(question) {
		this.questions.push(question);
		this.triggerSortedQuestions();
	}

})