var React = require('react/addons');
var Reflux = require('reflux');
var QuestionStore = require('../stores/QuestionStore');
var QuestionActions = require('../actions/QuestionActions');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var QuestionList = React.createClass({
	mixins: [Reflux.connect(QuestionStore, "questions"), Reflux.connect(UserStore, "authenticated")],

	componentDidMount: function() {
		QuestionActions.getInitialData();
	},

	onVote: function(question) {
		if (!this.state.authenticated) {
			doLogin(function(profile) {
				UserActions.authenticatedUser(profile);
			});
			return;
		}
		if (question.votes.indexOf(UserStore.getUserId()) == -1)
			QuestionActions.voteQuestion(question);
	},

	getInitialState: function() {
		return {
			questions : [],
			authenticated: false,
		};
	},

	render: function() {
		var self = this;
		var questions = this.state.questions.map(function(question, i) {
			var liClass = "";
			if (question.votes.indexOf(UserStore.getUserId()) > -1)
				var voteClass = ' green';
			else voteClass = '';
			if (question.answered)
				liClass = " faded";
			if (question.currentQuestion)
				liClass = " current-question";
			return (
				<li className={"question-list-item" + liClass} key={question.id}>
					<div className="row">
						<div className="col-xs-2 col-sm-1 question-img-cell">
							<img src={question.avatar} className="img-rounded img-responsive" />
						</div>
						<div className="col-xs-9 col-sm-10 question-body-cell">
							<div className="question-header"><a href={"http://twitter.com/" + question.author} target="_blank">@{ question.author }</a></div>
							<div className="question-body">
								<p className="question-text">{ question.text }</p>
							</div>
						</div>
						<div className="col-xs-1">
							<span className="icon">
								<i className={"fa fa-fw fa-thumbs-up" + voteClass} onClick={self.onVote.bind(self, question)}></i>
							</span>
							<span className="vote-up">{question.votesCount}</span>
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