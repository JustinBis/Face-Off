import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Pictures } from './pictures.js';

//TODO add "active_bets" and "score" field to User
//TODO look up privacy so that these ^ fields cannot be changed client side
//TODO make sure "correct answer" field of pictures not accessible client side (not published)

Meteor.methods({
	'Bets.addBet'(pictureId, emojiId) {
		check(pictureId, String);
		check(emojiId, String);
		var userId = Meteor.userId();
		//Ensure logged in
		if (!userId) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}

		// if pictureId 

		// const picture = Pictures.find({"_id":pictureId});
		// Meteor.users({"_id":userId}).update({$set: {$activeBets: {$addToSet:}}})
		// if (picture.emojiId === emojiId) {

		// }
	}
})

