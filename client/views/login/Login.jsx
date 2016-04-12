import React from 'react';
import reportError from '../../../imports/ui/report-error';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		// this bindings
		this.loginWithFacebook = this.loginWithFacebook.bind(this);
	}

	render() {
		return (
			<div id='login'>
				<h1>Face Off</h1>
				<br />
				<button className='login-with-facebook-button' onClick={this.loginWithFacebook}></button>
			</div>
			);
	}

	loginWithFacebook() {
		Meteor.loginWithFacebook({}, (err) => {
			if(err)
			{
				reportError(err);
				return;
			}

		});
	}
}