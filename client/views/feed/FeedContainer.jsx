
import { Pictures } from '../../../imports/api/pictures.js';
import { Bets } from '../../../imports/api/bets.js';
import { createContainer } from 'meteor/react-meteor-data';
import { getMinutesAgo } from '../../../imports/ui/countdown-util.js';
import Feed from './Feed.jsx';
import users from '../../../imports/api/users';

/**
 * Container wrapping Feed in order to first retrieve necessary information from the database 
 * to create reactive components
 */
export default createContainer(() => {
  var now = new Date();
  var lastDay = now - (24*60*60*1000);
  return {
    images: Pictures.find({expired:false }, {sort:{createdAt:1}}).fetch(),
    userBets: Bets.find({userId:Meteor.userId(), createdAt:{ $gte:new Date(lastDay)} }).fetch()
  };
}, Feed);