var React = require('react');
var Header = require('./components/Header');
var QuestionList = require('./components/QuestionList');
var QuestionInput = require('./components/QuestionInput');

var ChatColumn = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<QuestionInput />
				<QuestionList />
			</div>
		);
	}

});

React.render(
	<ChatColumn />, document.getElementById('questions-column')
);