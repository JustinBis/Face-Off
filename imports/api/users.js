import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const users = Meteor.users;


if(Meteor.isServer) {
	Meteor.publish('userData', function() {
		console.log(this.userId)
		return Meteor.users.find(
			{_id:this.userId}, 
			{score:1});
	});
}
