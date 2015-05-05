var React = require('react');
var QuestionActions = require('../actions/QuestionActions');

var QuestionItem = React.createClass({

	_onClick: function(e) {
		QuestionActions.answerQuestion(this.props.question);
	},

	render: function() {
		return (
			<li className="question-list-item list-group-item">
				<div className="row">
					<div className="col-xs-2 col-sm-1">
						<img src={this.props.question.avatar} className="img-rounded img-responsive" />
					</div>
					<div className="col-xs-9 col-sm-10 question-body-cell">
						<div>
							<a href={"http://twitter.com/" + this.props.question.author} target="_blank">@{ this.props.question.author}</a>
						</div>
						<div className="question-body">{ this.props.question.text }</div>
					</div>
					<div className="col-xs-1">
						<div className="fa fa-3x fa-check" onClick={this._onClick} ></div>
					</div>
				</div>
			</li>
		);
	}

});

module.exports = QuestionItem;