var Reflux = require('reflux');

module.exports = Reflux.createActions([
	'fetchInitialData',
	'initialFavoritedQuestions',
	'initialAnsweredQuestions',
	'initialIncomingQuestions',
	'newIncomingQuestion',
	'favoriteQuestion',
	'answerQuestion',
	'newVote',
	'deleteVote',
	'unAnswerQuestion',
]);