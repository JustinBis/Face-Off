
import { Pictures } from '../../../imports/api/pictures.js';
import { createContainer } from 'meteor/react-meteor-data';
import { getMinutesAgo } from '../../../imports/ui/countdown-util.js';
import Feed from './Feed.jsx';

/**
 * Container wrapping Feed in order to first retrieve necessary information from the database 
 * to create reactive components
 */
export default createContainer(() => {
  Meteor.subscribe('pictures');
  //Number of minutes any given image should last
  var imageDuration = 10;
  return {
    images: Pictures.find({createdAt: {$gt: getMinutesAgo(imageDuration)} }, {sort:{createdAt:-1}}).fetch(),
    imageDuration
  };
}, Feed); 