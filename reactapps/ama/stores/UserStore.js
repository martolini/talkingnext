var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var _authenticated = false;
var _userId = null;
var _screenName = null;

var UserStore = Reflux.createStore({
	listenables: [UserActions],

	onAuthenticatedUser: function(profile) {
		_authenticated = true;
		_userId = profile.id;
		_screenName = profile.screen_name;
		this.trigger(true);

	},

	onSetScreenName: function(screenName, userId) {
		_screenName = screenName;
		_userId = userId;
		_authenticated = true;
		this.trigger(_authenticated);
	},

	getScreenName: function() {
		return _screenName;
	},

	isAuthenticated: function() {
		return _authenticated;
	},

	getUserId: function() {
		return _userId;
	}
});

module.exports = UserStore;