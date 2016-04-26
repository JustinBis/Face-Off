/*
 * The pictures collection and methods
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { getOptions } from './emoji-util.js';
export const Pictures = new Mongo.Collection('pictures');
//Amount of time in milliseconds a given image lasts
export const IMAGE_DURATION_MILLIS = 1000*60*10;


/**
 * Sets up a timeout to reap pictures by setting their expired flag
 * @param  Number 	timeRemaining  time remaining in ms
 * @param  String 	pictureId      id of picture to set expiry of
 */
export function handleExpire(timeRemaining, pictureId){
	Meteor.setTimeout( () => {
		console.log("Expired picture", pictureId)
		Pictures.update({_id: pictureId}, {$set:{expired:true}})
	}, timeRemaining);	
}

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
		}, (err, docsInserted) => {
			//Initialize expiry handler for duration of image's lifespan
			if(Meteor.isServer) {
				if(err) {
					throw new Meteor.Error('insertion error', 'The database encountered an error saving the image');
				} else {
					handleExpire(IMAGE_DURATION_MILLIS, docsInserted)
				}
			}
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