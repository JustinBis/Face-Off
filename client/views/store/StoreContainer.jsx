
import { Purchases } from '../../../imports/api/purchases.js';
import { Items } from '../../../imports/api/items.js';
import { createContainer } from 'meteor/react-meteor-data';
import Store from './store.jsx';

/**
 * Container wrapping Store in order to first retrieve necessary information from the database 
 * to create reactive components
 */

export default createContainer(() => {
  Meteor.subscribe('purchases');
  var len = Items.length;
  var available = [];
  for (i = 0; i < len; i++) {
  	if (!Purchases.find({itemId: Items[i]._id}).count()){
  		available.push(Items[i]);
  	}
  }
  return {
    available: available
  };
}, Store);