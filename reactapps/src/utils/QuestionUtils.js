module.exports = {
	convertRawQuestion: function(rawQuestion) {
		return {
			id: rawQuestion.id,
			createdAt: new Date(rawQuestion.created_at * 1000),
			author: rawQuestion.author,
			text: rawQuestion.text,
		}
	}
}