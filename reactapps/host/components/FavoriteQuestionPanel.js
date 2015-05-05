var React = require('react');
var Reflux = require('reflux');
var FavoriteQuestionStore = require('../stores/FavoriteQuestionStore');
var FavoriteQuestionItem = require('./FavoriteQuestionItem');

var FavoriteQuestionPanel = React.createClass({
	mixins: [Reflux.connect(FavoriteQuestionStore, "questions")],
	
	getInitialState: function() {
		return {
			questions: FavoriteQuestionStore.questions
		};
	},

	render: function() {
		var questions = this.state.questions.map(function(question) {
			return (
				<FavoriteQuestionItem question={question} key={question.id} />
			);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<h1 className="title">Favorite Questions</h1>
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

module.exports = FavoriteQuestionPanel;