var React = require('react');
var Reflux = require('reflux');
var UserStore = require('../stores/UserStore');

var Header = React.createClass({
	mixins: [Reflux.connect(UserStore, "authenticated")],

	getInitialState: function() {
		return {
			authenticated: false, 
		};
	},

	render: function() {
		var text = this.state.authenticated ? ", @" + UserStore.getScreenName() : "";
		return (
			<div>
				<h1>Ask <strong>your</strong> questions{text}</h1>
				<em className="description center-block">Leave your questions now!</em>
				<div className="container-colored-line">
					<hr className="colored-line" />
					<div className="add-colored-line"></div>
				</div>
			</div>
		);
	}

});

module.exports = Header;