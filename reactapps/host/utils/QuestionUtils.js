module.exports = {
	convertRawQuestion: function(rawQuestion) {
		return {
			id: rawQuestion.id,
			createdAt: new Date(rawQuestion.created_at * 1000),
			author: rawQuestion.author,
			avatar: rawQuestion.avatar,
			answered: rawQuestion.answered,
			votesCount: JSON.parse(rawQuestion.votes).length,
			text: rawQuestion.text,
			currentQuestion: rawQuestion.current_question,
			favorited: rawQuestion.favorited
		}
	}
}