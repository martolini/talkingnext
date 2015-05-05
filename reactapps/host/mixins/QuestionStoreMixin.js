module.exports = {
	init: function() {
		this.questions = []
	},

	triggerSortedQuestions: function() {
		this.questions.sort(function(a, b) {
			return b.createdAt - a.createdAt;
		});
		this.trigger(this.questions);
	},

	onNewVote: function(vote) {
		for (var i=0; i<this.questions.length; i++) {
			if (this.questions[i].id == vote.question_id) {
				this.questions[i].votesCount += 1;
				this.triggerSortedQuestions();
				break;
			}
		}
	},

	onDeleteVote: function(vote) {
		for (var i=0; i<this.questions.length; i++) {
			if (this.questions[i].id == vote.question_id) {
				this.questions[i].votesCount -= 1;
				this.triggerSortedQuestions();
				break;
			}
		}
	}
}