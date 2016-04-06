import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './views/login/Login.jsx';
import Feed from './views/feed/Feed.jsx';
import Bet from './views/place_bet/PlaceBet.jsx'
import TakePicture from './views/take_picture/TakePicture.jsx'

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		mount(Login, {
			main: () => <Login />,
		});
	},
});

FlowRouter.route('/feed', {
	name: 'App.feed',
	action() {
		mount(Feed, {
			main: () => <Feed />,
		});
	},
});

FlowRouter.route('/bet', {
	name: 'App.Bet',
	action() {
		mount(Bet, {
			main: () => <Bet />,
		});
	},
});

FlowRouter.route('/take-picture', {
	name: 'App.take-picture',
	action() {
		mount(TakePicture, {
			main: () => <TakePicture />,
		});
	},
});