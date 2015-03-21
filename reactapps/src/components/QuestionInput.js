var React = require('react');
var Reflux = require('reflux');
var QuestionActions = require('../actions/QuestionActions');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var Modal = require('react-bootstrap/lib/Modal');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var ENTER_KEY_CODE = 13;

var QuestionInput = React.createClass({
	mixins: [OverlayMixin],

	getInitialState: function() {
		return {
			text: "",
			isModalOpen: false,
		};
	},

	_onChange: function(e) {
		this.setState({text: e.target.value});
	},

	_onSubmit: function() {
		if (!this.props.authenticated) {
			return this.handleToggle();
		}
		text = this.refs.textarea.getDOMNode().value;
		if (text.length > 0) {
			QuestionActions.postQuestion(text);
			this.setState({text: ''});
		}
	},

	handleToggle: function() {
		this.setState({isModalOpen: !this.state.isModalOpen});
	},

	_onKeyDown: function(event) {
		if (event.keyCode == ENTER_KEY_CODE && !(event.shiftKey)) {
			event.preventDefault();
			this._onSubmit();
		}
	},

	_createUser: function(e) {
		e.preventDefault();
		UserActions.createUser($('#signupform').serializeArray());
		this.handleToggle();
	},

	_logIn: function(e) {
		e.preventDefault();
		UserActions.authenticateUser($('#loginform').serializeArray());
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
	},

	renderOverlay: function() {
		if (!this.state.isModalOpen)
			return <span />
		return (
			<Modal bsStyle="primary" title="Join in on the session" onRequestHide={this.handleToggle}>
				<TabbedArea defaultActiveKey={1}>
					<TabPane eventKey={1} tab="Register">
						<form id="signupform" method="post">
							<div className="modal-body">
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
										<input type="email" name="email" className="form-control" placeholder="josh.parker@gmail.com" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-lock fa-fw"></i></span>
										<input type="password" name="password" className="form-control" placeholder="password" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
										<input type="text" name="display_name" className="form-control" placeholder="joshparker" />
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button className="btn btn-primary" onClick={this._createUser} >Send question</button>
							</div>
						</form>
					</TabPane>
					<TabPane eventKey={2} tab="Log in">
						<form id="loginform" method="post">
							<div className="modal-body">
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
										<input type="email" name="email" className="form-control" placeholder="josh.parker@gmail.com" />
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon"><i className="fa fa-lock fa-fw"></i></span>
										<input type="password" name="password" className="form-control" placeholder="password" />
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button className="btn btn-primary" onClick={this._logIn} >Log in</button>
							</div>
						</form>
					</TabPane>
				</TabbedArea>
			</Modal>
		)
	}

});

module.exports = QuestionInput;