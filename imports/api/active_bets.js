import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Pictures } from './pictures.js';

//TODO add "active_bets" and "score" field to User
//TODO look up privacy so that these ^ fields cannot be changed client side
//TODO make sure "correct answer" field of pictures not accessible client side (not published)

Meteor.methods({

	/**
	 * Inserting a bet into the Bets collection
	 * Params
	 * @param  String pictureId ID of the picture being bet on
	 * @param  String emojiId   ID of the emoji selected by the user
	 */
	'Bets.insert'(pictureId, emojiGuessed) {
		check(pictureId, String);
		check(emojiId, String);
		var userId = Meteor.userId();
		//Ensure logged in
		if (!userId) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}
		
		// var stake = 100;
		// check uniqueBet
		// get pictures info 
		// Bets.insert({
		// 	userId,
		// 	pictureId,
		// 	emojiActual,
		// 	emojiGuessed,
		// 	stake
		// });

		// if picture emoji === emojiActual
		// 	user.update + stake
		// else
		// 	user.update - stake
	}
})

