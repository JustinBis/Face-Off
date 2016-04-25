import {Pictures} from '../../api/pictures.js';

/**
 * Sets up a timeout to reap pictures by setting their expired flag
 * @param  {[type]} timeRemaining [description]
 * @param  {[type]} pictureId     [description]
 * @return {[type]}               [description]
 */
function handleExpire(timeRemaining, pictureId){
	Meteor.setTimeout(Pictures.update({_id: pictureId}, {$set:{expired:true}}), timeRemaining);	
}

//TODO cleanup script on startup 
//TODO migration function setting default expired value to false
//TODO fake activity set expired to false
//TODO update FeedContainer code to reflect image cleanup expiry