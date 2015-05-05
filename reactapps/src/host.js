var React = require('react');
var IncomingQuestionPanel = require('./components/IncomingQuestionPanel');
var QuestionActions = require('./actions/QuestionActions');

var Page = React.createClass({
	render: function() {
		return (
			<div className="row">
				<IncomingQuestionPanel />
				<h1>Hei</h1>
			</div>
		)
	}
});

React.render(
	<Page />, document.getElementById('content')
);