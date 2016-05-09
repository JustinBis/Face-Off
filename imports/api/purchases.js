import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Purchases = new Mongo.Collection('purchases');

if (Meteor.isServer) {
	Meteor.publish('purchases', function itemsPublication (){
		return Purchases.find({user: this.userId});
	});
}


Meteor.methods({
	
	'purchases.insert'(itemId, url, price) {

		check(itemId, String);

		if (!Meteor.userId()){
			throw new Meteor.Error('not-authorized', 'You must be logged in to buy an item');
		}

		Purchases.insert({
			itemId: itemId, 
			itemImage: url,
			user: Meteor.userId()
		});

		Meteor.users.update({_id: Meteor.userId()}, {$inc:{score: -1 * price}});

	},

	'purchases.removeAll'() {
		Purchases.remove({});
	}
});