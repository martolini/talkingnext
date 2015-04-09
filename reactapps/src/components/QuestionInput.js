var React = require('react');
var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var ENTER_KEY_CODE = 13;

var QuestionInput = React.createClass({

	getInitialState: function() {
		return {
			text: "",
		};
	},

	_onChange: function(e) {
		this.setState({text: e.target.value});
	},

	_onSubmit: function() {
		if (!this.props.authenticated) {
			doLogin(function(profile) {
				UserActions.authenticatedUser(profile);
			});
			return;
		}
		text = this.refs.textarea.getDOMNode().value;
		if (text.length > 0) {
			QuestionActions.postQuestion(text);
			this.setState({text: ''});
		}
	},

	_onKeyDown: function(event) {
		if (event.keyCode == ENTER_KEY_CODE && !(event.shiftKey)) {
			event.preventDefault();
			this._onSubmit();
		}
	},

	render: function() {
		return (
			<div className="question-input input-group">
				<textarea
					ref="textarea"
					onKeyDown={this._onKeyDown}
					className="form-control"
					name="message"
					autoCorrect="off"
					placeholder="Ask your question and hit enter"
					spellCheck="true"
					rows="2"
					value={this.state.text}
					onChange={this._onChange}
				/>
				<span
				className="input-group-addon btn btn-primary"
				onClick={this._onSubmit}
				>Ask</span>
			</div>
		);
	}

});

module.exports = QuestionInput;