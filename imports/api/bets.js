import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Pictures } from './pictures.js';
//TODO make sure "correct answer" field of pictures not accessible client side (not published)
export const Bets = new Mongo.Collection('bets');
Meteor.methods({

	/**
	 * Inserting a bet into the Bets collection
	 * Params
	 * @param  String pictureId ID of the picture being bet on
	 * @param  String emojiGuessed   ID of the emoji selected by the user
	 */
	'bets.insert'(pictureId, emojiGuessed) {
		check(pictureId, String);
		check(emojiGuessed, String);
		const userId = Meteor.userId();
		//Ensure logged in
		if (!userId) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}

		const stake = 100;
		const prevBet = Bets.find({pictureId:pictureId, userId:userId}).count();
		if (prevBet) {
			throw new Meteor.Error('duplicate-bet', 'You may not bet on a given picture more than once');
		}
		const pic = Pictures.findOne({_id: pictureId});
		const emojiActual = pic.emoji;
		Bets.insert({
			userId,
			pictureId,
			emojiActual,
			emojiGuessed,
			stake
		});

		//Update user's score based on correctness/incorrectness
		if (emojiActual === emojiGuessed) {
			Meteor.users.update({_id:userId}, {$inc:{score:stake}});
		} else {
			Meteor.users.update({_id:userId}, {$inc:{score:-1*stake}});
		}
		return emojiActual === emojiGuessed;
	},

	/**
	 * Get's the status (correct or incorrect) of a users guess on a given image
	 * 
	 * @param  String pictureId ID of the picture being bet on
	 * @return boolean  Whether the user's guess was correct or not
	 */
	'bets.getGuessStatus'(pictureId) {
		check(pictureId, String);
		const userId = Meteor.userId();
		//Ensure logged in
		if (!userId) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}
		console.log("Guess?",pictureId)
		const bet = Bets.findOne({userId, pictureId});
		if (!bet) {
			return 'not-bet';
		}
		return bet.emojiActual === bet.emojiGuessed ? 'bet-correct' : 'bet-incorrect';
	}
});

