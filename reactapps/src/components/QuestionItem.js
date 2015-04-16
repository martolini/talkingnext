var React = require('react');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');
var QuestionActions = require('../actions/QuestionActions');


var QuestionItem = React.createClass({

	getInitialState: function() {
		return {
			text: this.props.question.text,
			editable: false
		};
	},

	onVote: function() {
		if (!this.props.authenticated) {
			doLogin(function(profile) {
				UserActions.authenticatedUser(profile);
			});
			return;
		}
		if (this.props.question.votes.indexOf(UserStore.getUserId()) == -1)
			QuestionActions.voteQuestion(this.props.question);
		else {
			QuestionActions.unVoteQuestion(this.props.question);
		}
	},

	onTextClick: function() {
		if (this.props.question.author == UserStore.getScreenName()) {
			this.setState({editable: !this.state.editable});
		}
	},

	onTextChange: function(e) {
		this.setState({text: e.target.value});
	},

	onKeyDown: function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			QuestionActions.editQuestion(this.props.question.id, this.state.text);
			this.setState({editable: false});
		}
	},

	render: function() {
		var voteClass = '';
		var liClass = '';
		if (this.props.question.votes.indexOf(UserStore.getUserId()) > -1)
			voteClass = ' green';
		if (this.props.question.answered)
			liClass = " faded";
		var answered = <span />;
		if (this.props.question.currentQuestion) {
			answered = (
				<div className="row">
					<div className="col-xs-12" style={{paddingLeft: '0'}}>
						<p className="text-success">
							Current question
						</p>
					</div>
				</div>
			);
			liClass = " current-question";
		}

		if (!this.state.editable) {
			var questionText = (
				<p className="question-text" onClick={this.onTextClick}>{ this.props.question.text }</p>
			);
		}
		else {
			var questionText = (
				<form className="form">
					<textarea value={this.state.text} className="form-control" onChange={this.onTextChange} onKeyDown={this.onKeyDown} />
				</form>
			);
		}

		return (
			<li className={"question-list-item" + liClass}>
				{ answered }
				<div className="row">
					<div className="col-xs-2 col-sm-1 question-img-cell">
						<img src={this.props.question.avatar} className="img-rounded img-responsive" />
					</div>
					<div className="col-xs-9 col-sm-10 question-body-cell">
						<div className="question-header"><a href={"http://twitter.com/" + this.props.question.author} target="_blank">@{ this.props.question.author }</a></div>
						<div className="question-body">
							{ questionText }
						</div>
					</div>
					<div className="col-xs-1">
						<span className="icon">
							<i className={"fa fa-fw fa-thumbs-up" + voteClass} onClick={this.onVote}></i>
						</span>
						<span className="vote-up">{this.props.question.votes.length}</span>
					</div>
				</div>
			</li>
		);
	}

});

module.exports = QuestionItem;