

import { Pictures, handleExpire, IMAGE_DURATION_MILLIS, insertPicture } from '../../api/pictures.js';
import { Bets } from '../../api/bets.js';
/**
 * Fakes user activity.
 * Finds random picture and "revives" it by changing it's created at date,
 * so as to simulate an active "feed" even when images are expiring.
 * 
 */
var fakeUserActivity = function(id) {
	//Retrieve 20 pictures
	var pic = Pictures.findOne({_id:id});
	if(!pic) {
		return;
	}
	//Choose random pic
	var pictureData = pic.pictureData;
	var emoji = pic.emoji;
	var userId = "ROBOTUSER";

	//Remove old picture/bets, reinsert as new picture
	Pictures.remove({_id:pic._id});
	Bets.remove({pictureId:pic._id});
	insertPicture(pictureData, emoji, userId);

	//Clear bets that were on the given image
	console.log("Revived picture:",pic._id);
}

/**
 * Gets numIds number of ids from the pictures collection
 * selected randomly from all ids in the db
 * @param  number 	numIds 
 * @return ["id"]       
 */ 
var getRandomIds = function(numIds){
	var ids = Pictures.find({},{fields:{_id:1}}).fetch();
	if(ids.length <= numIds) {
		return ids;
	}
	var randIds = [];
	for(var i=0; i<numIds; i++) {
		var randInd = Math.floor(Math.random() * ids.length);
		randIds.push( ids.splice(randInd,1)[0]._id );
	}
	return randIds;
}
var fakeOnePicture = function() {
	var ids = getRandomIds(1);
	fakeUserActivity(ids[0]);
}

var revives = 20;
var ids = getRandomIds(revives);
for(var i = 0; i < revives; i ++) {
	fakeUserActivity(ids[i]);
}
Meteor.setInterval(fakeOnePicture, 60*1000*1);