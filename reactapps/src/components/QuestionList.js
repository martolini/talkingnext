var React = require('react/addons');
var Reflux = require('reflux');
var QuestionStore = require('../stores/QuestionStore');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');
var QuestionItem = require('../components/QuestionItem');
var QuestionActions = require('../actions/QuestionActions');


var QuestionList = React.createClass({
	mixins: [Reflux.connect(QuestionStore, "questions"), Reflux.connect(UserStore, "authenticated")],

	componentDidMount: function() {
		QuestionActions.getInitialData();
	},

	getInitialState: function() {
		return {
			questions : [],
			authenticated: false,
		};
	},

	render: function() {
		var self = this;
		var questions = this.state.questions.map(function(question) {
			return (
				<QuestionItem question={question} authenticated={self.state.authenticated} key={question.id} />
			);
		});
		return (
			<ul className="question-list">
				{ questions }
			</ul>
		);
	}

});

module.exports = QuestionList;