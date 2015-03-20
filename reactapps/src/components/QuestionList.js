var React = require('react');
var Reflux = require('reflux');
var QuestionStore = require('../stores/QuestionStore');
var QuestionActions = require('../actions/QuestionActions');

var QuestionList = React.createClass({
	mixins: [Reflux.connect(QuestionStore, "messages")],

	componentDidMount: function() {
		QuestionActions.getInitialData();
	},

	getInitialState: function() {
		return {
			messages : []
		};
	},

	render: function() {
		var messages = this.state.messages.map(function(message, i) {
			return (
				<li className="question-list-item" key={i}>
					<div className="row">
						<div className="question-img col-xs-1">
							<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" className="img-circle img-responsive" />
						</div>
						<div className="col-xs-10">
							<div className="question-header"><a href="#">{ message.author }</a></div>
							<div className="question-body">
								<p className="question-text">{ message.text }</p>
							</div>
						</div>
						<div className="col-xs-1">
							<span className="icon">
								<i className="fa fa-fw fa-thumbs-up"></i>
							</span>
							<span className="vote-up"></span>
						</div>
					</div>
				</li>
			)
		});
		return (
			<ul className="question-list">
				{ messages }
			</ul>
		);
	}

});

module.exports = QuestionList;