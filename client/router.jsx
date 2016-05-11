import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './views/login/Login.jsx';
import FeedContainer from './views/feed/FeedContainer.jsx';
import BetContainer from './views/place_bet/BetContainer.jsx'
import Camera from './views/camera/Camera.jsx'
import StoreContainer from './views/store/StoreContainer.jsx';

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
		var retObject = Accounts.onLogin(() => {
			FlowRouter.go(loggedInDefault)
			// Unregister the hook using the stop function returned by Accounts.onLogin
			// Which is, for some reason, held in an object. Oh Meteor...
			if(retObject && retObject.stop) retObject.stop();
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
		mount(FeedContainer, {
			main: () => <FeedContainer />,
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

loggedInRoutes.route('/camera', {
	name: 'App.camera',
	action() {
		mount(Camera, {
			main: () => <Camera />,
		});
	},
});

loggedInRoutes.route('/store', {
	name: 'App.store',
	action() {
		mount(StoreContainer, {
			main: () => <StoreContainer />,
		});
	},
});
