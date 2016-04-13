import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './views/login/Login.jsx';
import Feed from './views/feed/Feed.jsx';
import BetContainer from './views/place_bet/BetContainer.jsx'
import TakePicture from './views/take_picture/TakePicture.jsx'

// The default route for a logged out user (e.g. where a user will be redirected on logout)
const loggedOutDefault = 'App.login';
// The default route for a logged in user (e.g. where a user will be redirected on login)
const loggedInDefault = 'App.feed';


FlowRouter.route('/', {
	name: 'App.index',
	action() {
		FlowRouter.go('App.login');
	},
});

FlowRouter.route('/login', {
	name: 'App.login',
	triggersEnter: [ (context, redirect) => {
		// If the is logged in, redirect them to the feed
		if(Meteor.loggingIn() || Meteor.userId())
		{
			redirect(loggedInDefault);
		}
	}],
	action() {
		mount(Login, {
			main: () => <Login />,
		});

		// Redirect on login
		Accounts.onLogin((stop) => {
			console.log('yeah');
			FlowRouter.go(loggedInDefault)
			// Unregister the hook
			stop();
		});
	},
});

/*
 * Routes only available to logged in users
 */

// Hooks for login


var loggedInRoutes = FlowRouter.group({
	name: 'loggedInRoutes',
	triggersEnter: [ (context, redirect) => {
		console.log("LoggedInRoute");
		// If the user isn't logged in, make them log in
		if(!(Meteor.loggingIn() || Meteor.userId()))
		{
			// TODO: uncomment this to enable logins
			redirect('App.login');
		}
	}]
});

loggedInRoutes.route('/feed', {
	name: 'App.feed',
	action() {
		mount(Feed, {
			main: () => <Feed />,
		});
	},
});

loggedInRoutes.route('/bet', {
	name: 'App.bet',
	action(params,queryParams) {
		console.log(queryParams.id)
		mount(BetContainer, {
			main: () => <BetContainer params={{pictureId: queryParams.id}} />,
		});
	},
});

loggedInRoutes.route('/take-picture', {
	name: 'App.take-picture',
	action() {
		mount(TakePicture, {
			main: () => <TakePicture />,
		});
	},
});