var React = require('react');
var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var CurrentQuestionStore = require('../stores/CurrentQuestionStore');

var QuestionItem = React.createClass({
	mixins: [Reflux.connect(CurrentQuestionStore, "currentQuestion")],

	getInitialState: function() {
		return {
			currentQuestion: CurrentQuestionStore.currentQuestion
		}
	},

	_onClick: function(e) {
		QuestionActions.unAnswerQuestion(this.props.question);
	},

	render: function() {
		var className = "question-list-item list-group-item";
		if (this.state.currentQuestion == this.props.question.id)
			className += ' current';
		return (
			<li className={ className }>
				<div className="row">
					<div className="col-xs-2 col-sm-1">
						<img src={this.props.question.avatar} className="img-rounded img-responsive" />
					</div>
					<div className="col-xs-8 col-sm-9">
						<div>
							<a href={"http://twitter.com/" + this.props.question.author} target="_blank">@{ this.props.question.author}</a>
						</div>
						<div className="question-body">{ this.props.question.text }</div>
					</div>
					<div className="col-xs-2">
						<div className="fa fa-2x fa-ban" onClick={this._onClick} >{ this.props.question.votesCount }</div>
					</div>
				</div>
			</li>
		);
	}

});

module.exports = QuestionItem;