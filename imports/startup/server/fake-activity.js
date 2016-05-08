

import { Pictures, handleExpire, IMAGE_DURATION_MILLIS, insertPicture } from '../../api/pictures.js';
import { Bets } from '../../api/bets.js';
/**
 * Fakes user activity.
 * Finds random picture and "revives" it by changing it's created at date,
 * so as to simulate an active "feed" even when images are expiring.
 * 
 */
var fakeUser = function() {
	//Retrieve 20 pictures
	var pics = Pictures.find({ },{limit:20}).fetch();
	if(!pics.length) {
		return;
	}
	//Choose random pic
	var pic = pics[_.random(0,pics.length-1)]; 
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
 
var revives = 10;
for(var i = 0; i < revives; i ++) {
	fakeUser();
}

Meteor.setInterval(fakeUser, 60*1000*1);