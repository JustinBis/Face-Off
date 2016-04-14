

import { Pictures } from '../../api/pictures.js';


/**
 * Fakes user activity.
 * Finds random picture and "revives" it by changing it's created at date,
 * so as to simulate an active "feed" even when images are expiring.
 * 
 */
var fakeUser = function() {

	//Retrieve 20 pictures
	var pics = Pictures.find({},{limit:20}).fetch();
	//Choose random pic
	var pic = pics[_.random(0,pics.length)];
	//Update pictures createdAt time
	var now = new Date();
	Pictures.update({"_id":pic._id}, {"createdAt":now});

	console.log("Revived picture:",pic._id);
}

fakeUser();
Meteor.setInterval(fakeUser, 60*1000);