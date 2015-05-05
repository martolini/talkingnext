var React = require('react');
var QuestionActions = require('../actions/QuestionActions');

var QuestionItem = React.createClass({

	_onClick: function(e) {
		QuestionActions.favoriteQuestion(this.props.question);
	},

	render: function() {
		return (
			<li className="question-list-item list-group-item">
				<div className="row">
					<div className="col-xs-2 col-sm-1">
						<img src={this.props.question.avatar} className="img-rounded img-responsive" />
					</div>
					<div className="col-xs-8 col-sm-9 question-body-cell">
						<div>
							<a href={"http://twitter.com/" + this.props.question.author} target="_blank">@{ this.props.question.author}</a>
						</div>
						<div className="question-body">{ this.props.question.text }</div>
					</div>
					<div className="col-xs-2">
						<div className="fa fa-2x fa-star" onClick={this._onClick} >{ this.props.question.votesCount }</div>
					</div>
				</div>
			</li>
		);
	}

});

module.exports = QuestionItem;