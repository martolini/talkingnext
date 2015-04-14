var UserStore = require('../stores/UserStore');

module.exports = {
	convertRawQuestion: function(rawQuestion) {
		votes = JSON.parse(rawQuestion.votes);
		return {
			id: rawQuestion.id,
			createdAt: new Date(rawQuestion.created_at * 1000),
			author: rawQuestion.author,
			avatar: rawQuestion.avatar,
			answered: rawQuestion.answered,
			votes: votes,
			text: rawQuestion.text,
			currentQuestion: rawQuestion.current_question
		}
	}
}