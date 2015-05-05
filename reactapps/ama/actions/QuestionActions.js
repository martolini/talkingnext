var Reflux = require('Reflux');

var QuestionActions = Reflux.createActions([
	'postQuestion',
	'getInitialData',
	'voteQuestion',
	'unVoteQuestion',
	'editQuestion',
]);

module.exports = QuestionActions;