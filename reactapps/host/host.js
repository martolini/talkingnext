var React = require('react');
var IncomingQuestionPanel = require('./components/IncomingQuestionPanel');
var FavoriteQuestionPanel = require('./components/FavoriteQuestionPanel');
var AnsweredQuestionPanel = require('./components/AnsweredQuestionPanel');
var QuestionStore = require('./stores/QuestionStore');
var PusherHandler = require('./handlers/PusherHandler');
var Header = require('./components/Header');

var Page = React.createClass({
	componentDidMount: function() {
		PusherHandler.init();
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-xs-6">
					<div className="row">
						<IncomingQuestionPanel />
					</div>
					<div className="row">
						<AnsweredQuestionPanel />
					</div>
				</div>
				<div className="col-xs-6">
					<FavoriteQuestionPanel />
				</div>
			</div>
		)
	}
});

React.render(
	<Page />, document.getElementById('content')
);