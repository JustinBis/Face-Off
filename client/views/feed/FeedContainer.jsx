
import { Pictures } from '../../../imports/api/pictures.js';
import { createContainer } from 'meteor/react-meteor-data';
import Feed from './Feed.jsx';

/**
 * Container wrapping Feed in order to first retrieve necessary information from the database 
 * to create reactive components
 */
export default createContainer(() => {
  Meteor.subscribe('pictures');
  return {
    images: Pictures.find({}, {sort:{createdAt:1}}).fetch(),
  };
}, Feed); 