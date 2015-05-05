var React = require('react');
var Reflux = require('reflux');
var AnsweredQuestionStore = require('../stores/AnsweredQuestionStore');
var AnsweredQuestionItem = require('./AnsweredQuestionItem');

var AnsweredQuestionPanel = React.createClass({
	mixins: [Reflux.connect(AnsweredQuestionStore, "questions")],
	
	getInitialState: function() {
		return {
			questions: AnsweredQuestionStore.questions
		};
	},

	render: function() {
		var questions = this.state.questions.map(function(question) {
			return (
				<AnsweredQuestionItem question={question} key={question.id} />
			);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<h1 className="title">Answered Questions</h1>
					<div className="container-colored-line">
						<hr className="colored-line" />
						<div className="add-colored-line"></div>
					</div>
					<ul className="question-list list-group">
						{ questions }
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = AnsweredQuestionPanel;