var Reflux = require('Reflux');

var QuestionActions = Reflux.createActions([
	'postQuestion',
	'getInitialData',
	'voteQuestion',
]);

module.exports = QuestionActions;