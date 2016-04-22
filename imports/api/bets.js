import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Pictures } from './pictures.js';


//TODO make sure "correct answer" field of pictures not accessible client side (not published)
export const Bets = new Mongo.collection('bets');
Meteor.methods({

	/**
	 * Inserting a bet into the Bets collection
	 * Params
	 * @param  String pictureId ID of the picture being bet on
	 * @param  String emojiGuessed   ID of the emoji selected by the user
	 */
	'Bets.insert'(pictureId, emojiGuessed) {
		check(pictureId, String);
		check(emojiGuessed, String);
		var userId = Meteor.userId();
		//Ensure logged in
		if (!userId) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}

		const stake = 100;
		const prevBet = Bets.find({pictureId:pictureId, userId:userId});
		if (prevBet) {
			throw new Meteor.Error('duplicate-bet', 'You may not bet on a given picture more than once');
		}
		const pic = Pictures.find({_id: pictureId});
		const emojiActual = pic.emojiUrl;
		Bets.insert({
			userId,
			pictureId,
			emojiActual,
			emojiGuessed,
			stake
		});

		//Update user's score based on correctness/incorrectness
		if (emojiActual === emojiGuessed) {
			Meteor.users().update({_id:userId}, {$inc:{score:stake}});
		} else {
			Meteor.users().update({_id:userId}, {$inc:{score:-1*stake}});
		}
	}
});

