var React = require('react');

var IncomingQuestionPanel = React.createClass({

	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<h1 className="title">Incoming Questions</h1>
					<div className="container-colored-line">
						<hr class="colored-line" />
						<div class="add-colored-line"></div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = IncomingQuestionPanel;