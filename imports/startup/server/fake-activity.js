

import { Pictures, handleExpire, IMAGE_DURATION_MILLIS } from '../../api/pictures.js';
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

	//Update pictures createdAt time
	var now = new Date();
	Pictures.update({_id:pic._id}, {$set: {createdAt:now, usersBet:[], expired:false}} );
	handleExpire(IMAGE_DURATION_MILLIS, pic._id);

	//Clear bets that were on the given image
	Bets.remove({pictureId:pic._id});
	console.log("Revived picture:",pic._id);
}

fakeUser();
fakeUser();
fakeUser();
fakeUser();

Meteor.setInterval(fakeUser, 5*1000*1);