var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var _authenticated = false;
var _displayName = null;

var UserStore = Reflux.createStore({
	listenables: [UserActions],

	requestReturn: function(data) {
		_authenticated = data.content.authenticated;
		if (_authenticated) {
			mixpanel.identify(data.content.uid);
			_displayName = data.content.displayName;
		}
		this.trigger(_authenticated);
	},

	createUserReturn: function(data) {
		_authenticated = data.content.authenticated;
		_displayName = data.content.displayName;
		if (_authenticated) {
			mixpanel.people.set({
				'$name': _displayName,
				'$email': data.content.email
			});
			mixpanel.alias(data.content.uid);
		}
	},

	onCreateUser: function(data) {
		$.post('/ajax/create_user/', data, this.createUserReturn);
	},

	onAuthenticate: function() {
		$.get('/ajax/authenticate_user/', this.requestReturn);
	},

	onAuthenticateUser: function(data) {
		$.post('/ajax/authenticate_user/', data, this.requestReturn);
	},

	onDidAuthenticate: function(displayName, uid) {
		mixpanel.identify(uid);
		_displayName = displayName;
		_authenticated = true;
		this.trigger(_authenticated);
	},

	getDisplayName: function() {
		return _displayName;
	},

	isAuthenticated: function() {
		return _authenticated;
	}
});

module.exports = UserStore;