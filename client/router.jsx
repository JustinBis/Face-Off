import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './views/login/Login.jsx';
import Feed from './views/feed/Feed.jsx';
import Bet from './views/place_bet/PlaceBet.jsx'
import TakePicture from './views/take_picture/TakePicture.jsx'


FlowRouter.route('/', {
	name: 'App.index',
	action() {
		FlowRouter.go('App.login');
	},
});

FlowRouter.route('/login', {
	name: 'App.login',
	triggersEnter: [ (context, redirect) => {
		// If the user isn't logged in, make them log in
		if(Meteor.loggingIn() || Meteor.userId())
		{
			redirect('App.feed');
		}
	}],
	action() {
		mount(Login, {
			main: () => <Login />,
		});
	},
});

/*
 * Routes only available to logged in users
 */
var loggedInRoutes = FlowRouter.group({
	name: 'loggedInRoutes',
	triggersEnter: [ (context, redirect) => {
		console.log("LoggedInRoute");
		// If the user isn't logged in, make them log in
		if(!(Meteor.loggingIn() || Meteor.userId()))
		{
			//Session.set('redirectAfterLogin', context.path);
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
	action() {
		mount(Bet, {
			main: () => <Bet />,
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