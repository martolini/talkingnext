var React = require('react');
var Reflux = require('reflux');
var QuestionStore = require('../stores/QuestionStore');
var QuestionActions = require('../actions/QuestionActions');

var QuestionList = React.createClass({
	mixins: [Reflux.connect(QuestionStore, "questions")],

	componentDidMount: function() {
		QuestionActions.getInitialData();
	},

	onVote: function(question_id) {
		QuestionActions.voteQuestion(question_id);
	},

	getInitialState: function() {
		return {
			questions : []
		};
	},

	render: function() {
		var self = this;
		var questions = this.state.questions.map(function(question, i) {
			return (
				<li className="question-list-item" key={question.id}>
					<div className="row">
						<div className="col-xs-11">
							<div className="question-header"><a>@{ question.author }</a></div>
							<div className="question-body">
								<p className="question-text">{ question.text }</p>
							</div>
						</div>
						<div className="col-xs-1">
							<span className="icon">
								<i className="fa fa-fw fa-thumbs-up" onClick={self.onVote.bind(self, question.id)}></i>
							</span>
							<span className="vote-up">{question.votes}</span>
						</div>
					</div>
				</li>
			)
		});
		return (
			<ul className="question-list">
				{ questions }
			</ul>
		);
	}

});

module.exports = QuestionList;