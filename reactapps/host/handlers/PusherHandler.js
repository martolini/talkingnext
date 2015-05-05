var QuestionUtils = require('../utils/QuestionUtils');
var QuestionActions = require('../actions/QuestionActions');

module.exports = {
	init: function() {
		pusher = new Pusher('0171d23077dc46bdf230');
		var event = 'h_' + window.host_id;
		var questionChannel = pusher.subscribe(event);
		questionChannel.bind('new_question', this.onNewQuestion);
	},

	onNewQuestion: function(rawQuestion) {
		var question = QuestionUtils.convertRawQuestion(rawQuestion);
		QuestionActions.newIncomingQuestion(question);
	},
}