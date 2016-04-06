import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './views/login/Login.jsx';


FlowRouter.route('/', {
	name: 'App.home',
	action() {
		mount(Login, {
			main: () => <Login />,
		});
	},
});