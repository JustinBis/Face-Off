import React from 'react';

export default class Login extends React.Component {
	render() {
		Meteor.loginWithGoogle({
			requestPermissions: ['user', 'public_repo']
		}, function (err) {
			if (err)
			{
				console.log(err);
			}
		});
		return (
			<div> Hi I am the login page </div>
			);
	}
}