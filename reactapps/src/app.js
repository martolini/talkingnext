var React = require('react');
var Reflux = require('reflux');
var QuestionList = require('./components/QuestionList');
var QuestionInput = require('./components/QuestionInput');
var UserActions = require('./actions/UserActions');
var UserStore = require('./stores/UserStore');

var ChatColumn = React.createClass({
	mixins: [Reflux.listenTo(UserStore, "onAuthenticationChanged")],

	getInitialState: function() {
		return {
			authenticated: false 
		};
	},

	onAuthenticationChanged: function(wasAuthenticated) {
		if (wasAuthenticated != this.state.authenticated) {
			this.setState({authenticated: wasAuthenticated});
		}
	},

	render: function() {
		var text = "";
		if (this.state.authenticated)
			text = ", @" + UserStore.getDisplayName();
		return (
			<div>
				<h1>Ask <strong>your</strong> questions{text}</h1>
				<em className="description center-block">Leave your questions now!</em>
				<div className="container-colored-line">
					<hr className="colored-line" />
					<div className="add-colored-line"></div>
				</div>
				<QuestionInput authenticated={this.state.authenticated} />
				<QuestionList />
			</div>
		);
	}

});

React.render(
	<ChatColumn />, document.getElementById('questions-column')
);