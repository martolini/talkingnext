var React = require('react');
var Reflux = require('reflux');
var IncomingQuestionStore = require('../stores/IncomingQuestionStore');
var IncomingQuestionItem = require('./IncomingQuestionItem');

var IncomingQuestionPanel = React.createClass({
	mixins: [Reflux.connect(IncomingQuestionStore, "questions")],
	
	getInitialState: function() {
		return {
			questions: IncomingQuestionStore.questions
		};
	},

	render: function() {
		var questions = this.state.questions.map(function(question) {
			return (
				<IncomingQuestionItem question={question} key={question.id} />
			);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<h1 className="title">Incoming Questions</h1>
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

module.exports = IncomingQuestionPanel;