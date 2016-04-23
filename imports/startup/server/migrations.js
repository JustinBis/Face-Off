import {Pictures} from '../../api/pictures.js';
import {getOptions} from '../../api/emoji-util.js';

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

// If a given picture has no options tied to it, pop some in via getOptions
Pictures.find({options: {$exists:false}}, {_id:1}).forEach( picture => {
	Pictures.update({_id: picture._id}, {$set: {options: getOptions(picture.emoji)}});
});