var React = require('react');

var Header = React.createClass({

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1>Hey, Matt</h1>
				</div>
			</div>
		);
	}

});

module.exports = Header;