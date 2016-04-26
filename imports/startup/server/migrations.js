import {Pictures} from '../../api/pictures.js';
import {getOptions} from '../../api/emoji-util.js';


/**
 * DB Schema migrations, for documents lacking fields added to the schema later on  
 */

// If a given picture has no options field, pop some in via getOptions
Pictures.find({options: {$exists:false}}, {_id:1}).forEach( picture => {
	Pictures.update({_id: picture._id}, {$set: {options: getOptions(picture.emoji)}});
});

// If a given picture has no usersBet field, initialize as empty array
Pictures.find({usersBet: {$exists:false}}, {_id:1}).forEach( picture => {
	Pictures.update({_id: picture._id}, {$set: {usersBet: []}});
});

// If a given picture has no expired field, initialize to false
Pictures.find({expired: {$exists:false}}, {_id:1}).forEach( picture => {
	Pictures.update({_id: picture._id}, {$set: {expired: false}});
});

// If a given user has no score field, initialize to 1000
Meteor.users.find({score: {$exists:false}}).forEach( user => {
	Meteor.users.update({_id:user.id}, {$set: {score: 1000}});
});


/**
 *
 * Originally tried to to meteor migrations through percolate:migrations
 * it appears that this may not currently work on Meteor 1.3?
 * Regardless, in the end percolate:migrations was removed in favor of simple queries
 * 
	Migrations.add({
	  version: 1,
	  up: function() {console.log("HI")}
	});
	Migrations.migrateTo('latest');
 */