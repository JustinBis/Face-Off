import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Pictures } from '../../../imports/api/pictures.js';
import Bet from './Bet.jsx';

export default createContainer( ({params}) => {
	//TODO discover why ^params up there is not filled in in router.jsx by flow router's rendering
	//Temp workaround is to just get Query Param inside here
	// console.log(params); <-- Currently returns undefined
	const id = FlowRouter.getQueryParam("id");
 	return {
		image:Pictures.findOne({_id:id})
	};
}, Bet);