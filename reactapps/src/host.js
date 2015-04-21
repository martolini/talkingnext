var React = require('react');
var QuestionList = require('./components/QuestionList');
var QuestionInput = require('./components/QuestionInput');

var Page = React.createClass({
	render: function() {
		return (
			<div>
				<QuestionInput />
				<QuestionList />
			</div>
		);
	}

});

React.render(
	<Page />, document.getElementById('questions-column')
);