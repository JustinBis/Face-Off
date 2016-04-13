
import { Pictures } from '../../../imports/api/pictures.js';
import { createContainer } from 'meteor/react-meteor-data';
import Feed from './Feed.jsx';

export default createContainer(() => {
  return {
    images: Pictures.find({}, {sort:{createdAt:-1}}).fetch(),
  };
}, Feed); 