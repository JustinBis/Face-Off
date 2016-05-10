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


/**
 * Throttles the rate at which a particular user can request a given method.
 * Throws a 'chill-out' Meteor Error object when this user is requesting a method too quickly
 * @param  {string} method     The name of the method that is to be throttled
 * @param  {string} userId     The ID of this user
 *                             (usually returned by Meteor.userId(), but can be any unique identifier)
 * @param  {number} timeout    The timeout between requests, in milliseconds
 * @return {null}               This method returns nothing. Instead, it will throw a Meteor.Error if the user is throttled
 */
function throttleMethodRequestByUser(method, userId, timeout) {
	// Store data as part of the function itself
	// NOTE: for scalability, this should be replaced by a very fast distributed collection (e.g. Redis)
	
	// Ensure that all data is setup prior to the check
	if( !throttleMethodRequestByUser.methods ) throttleMethodRequestByUser.methods = {};
	if( !(method in throttleMethodRequestByUser.methods) ) throttleMethodRequestByUser.methods[method] = {};
	if( !(userId in throttleMethodRequestByUser.methods[method]) ) throttleMethodRequestByUser.methods[method][userId] = 0;
	

	var timeLastCalled = throttleMethodRequestByUser.methods[method][userId];
	var timeNow = Date.now();

	if(timeNow - timeLastCalled < timeout)
	{
		throw new Meteor.Error('chill-out', `You are calling ${method} too quickly. Please wait a bit and try again.`);
	}
	else
	{
		throttleMethodRequestByUser.methods[method][userId] = timeNow;
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
		
		throttleMethodRequestByUser('pictures.insert', Meteor.userId(), INSERT_THROTTLE_MILLIS);

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