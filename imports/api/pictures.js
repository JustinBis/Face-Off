/*
 * The pictures collection and methods
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { getOptions } from './emoji-util.js';

export const Pictures = new Mongo.Collection('pictures');
// Amount of time in milliseconds a given image lasts
export const IMAGE_DURATION_MILLIS = 1000*60*10;

// Amount of time in milliseconds to require between calls to 'pictures.insert'
const INSERT_THROTTLE_MILLIS = 5 * 1000;


/**
 * Sets up a timeout to reap pictures by setting their expired flag
 * @param  Number 	timeRemaining  time remaining in ms
 * @param  String 	pictureId      id of picture to set expiry of
 */
export function handleExpire(timeRemaining, pictureId){
	Meteor.setTimeout( () => {
		console.log("Expired picture", pictureId);
		Pictures.update({_id: pictureId}, {$set:{expired:true}});
	}, timeRemaining);	
}

if (Meteor.isServer) {
	Meteor.publish('pictures', function picturesPublication (){
		return Pictures.find();
	});
}

export function insertPicture (pictureData, emoji, userId) {
	Pictures.insert({
			pictureData,
			emoji,
			createdAt: new Date(),
			owner:userId,
			options: getOptions(emoji),
			usersBet: [],
			expired: false
		}, (err, docsInserted) => {
			//Initialize expiry handler for duration of image's lifespan
			if(Meteor.isServer) {
				if(err) {
					throw new Meteor.Error('insertion error', 'The database encountered an error saving the image');
				} else {
					handleExpire(IMAGE_DURATION_MILLIS, docsInserted);
				}
			}
	});
}

// Used to track the users who have inserted a photo recently
// NOTE: for scaling, this will have to change to be a collection in a database
var _photo_insert_throttle_list = {};

/**
 * Adds the current user to the list of throttled users
 * @param  {Meteor UserId} userId The Meteor UserId for this user
 * @return {null}        This method returns nothing
 */
function addUserToThrottleList(userId) {
	_photo_insert_throttle_list[userId] = true;
	Meteor.setTimeout(() => {
		removeUserFromThrottleList(userId);
	}, INSERT_THROTTLE_MILLIS);

}

/**
 * removeUserFromThrottleList Removes a user from the list of throttled users
 * @param  {Meteor UserId} userId The Meteor UserId for this user
 * @return {null}        This method returns nothing
 */
function removeUserFromThrottleList(userId) {
	delete _photo_insert_throttle_list[userId];
}

/**
 * userHasInsertedPhotoRecently Checks if the passed user has recently inserted a photo
 * @param  {Meteor UserId} userId The Meteor UserId for this user
 * @return {boolean} true if the user has recently inserted a photo, false otherwise.
 */
function userHasInsertedPhotoRecently(userId) {
	if(userId in _photo_insert_throttle_list)
	{
		return true;
	}
	else
	{
		return false;
	}
}


Meteor.methods({
	'pictures.insert'(pictureData, emoji) {
		if(!Meteor.userId())
		{
			throw new Meteor.Error('not-authorized', 'You must be logged in to save a picture');
		}

		check(pictureData, String);
		check(emoji, String);
		// TODO: check that the emoji is actually one of the approved emojis

		// Ensure that the user isn't calling this method too often
		if(Meteor.isServer)
		{
			if(userHasInsertedPhotoRecently(Meteor.userId()))
			{
				throw new Meteor.Error('chill-out', 'You are sending too many photos too quickly. Please wait a bit and try again.');
			}
			else
			{
				addUserToThrottleList(Meteor.userId());
			}
		}

		insertPicture(pictureData, emoji, Meteor.userId());

	},
	/**
	 * Adds user to list of users who have bet on this specific image
	 */
	'pictures.updateBets'(pictureId) {
		check(pictureId, String);
		console.log("Bet placed on ",pictureId);
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized', 'You must be logged in to place a bet');
		}

		Pictures.update(
		{
			_id: pictureId
		},
		{
			$push: {usersBet: Meteor.userId()} 
		});
	}
});