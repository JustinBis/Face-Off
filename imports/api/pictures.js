/*
 * The pictures collection and methods
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { getOptions } from './emoji-util.js';
export const Pictures = new Mongo.Collection('pictures');


if (Meteor.isServer) {
	Meteor.publish('pictures', function picturesPublication (){
		return Pictures.find();
	});
}

Meteor.methods({
	'pictures.insert'(pictureData, emoji) {
		check(pictureData, String);
		check(emoji, String);

		if(!Meteor.userId())
		{
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}

		Pictures.insert({
			pictureData,
			emoji,
			createdAt: new Date(),
			owner: Meteor.userId(),
			options: getOptions(emoji),
			usersBet: []
		});
	},
	/**
	 * Adds user to list of users who have bet on this specific image
	 */
	'pictures.updateBets'(pictureId) {
		check(pictureId, String);
		console.log("Bet placed on ",pictureId)
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to place a bet');
		}

		Pictures.update(
		{
			_id: pictureId
		},
		{
			$push: {usersBet: Meteor.userId()} 
		})
	}


});