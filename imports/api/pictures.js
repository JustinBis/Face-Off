/*
 * The pictures collection and methods
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Pictures = new Mongo.Collection('pictures');

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
			owner: Meteor.userId()
		});
	}
});