var QuestionUtils = require('../utils/QuestionUtils');
var QuestionActions = require('../actions/QuestionActions');
var IncomingQuestionStore = require('../stores/IncomingQuestionStore');
var FavoriteQuestionStore = require('../stores/FavoriteQuestionStore');
var AnsweredQuestionStore = require('../stores/AnsweredQuestionStore');

module.exports = {
	init: function() {
		pusher = new Pusher('0171d23077dc46bdf230');
		var event = 'h_' + window.host_id;
		var questionChannel = pusher.subscribe(event);
		questionChannel.bind('new_question', this.onNewQuestion);
		questionChannel.bind('new_vote', this.onNewVote);
		questionChannel.bind('deleted_vote', this.onDeleteVote);
	},

	onNewQuestion: function(rawQuestion) {
		var question = QuestionUtils.convertRawQuestion(rawQuestion);
		QuestionActions.newIncomingQuestion(question);
	},

	onNewVote: function(vote) {
		QuestionActions.newVote(vote);
	},

	onDeleteVote: function(vote) {
		QuestionActions.deleteVote(vote);
	}
}