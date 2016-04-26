import {Pictures, handleExpire, IMAGE_DURATION_MILLIS} from '../../api/pictures.js';

/**
 * Reinitialize expiry handlers for images that are still alive. Any image that has 
 * already gone past it's expiration (while the server was offline) that has not been reaped
 * will instantly expire
 */
Pictures.find({expired:false}).forEach( (picture) => {
	var now = new Date();
	var timeLeft = IMAGE_DURATION_MILLIS - (now-picture.createdAt);
	handleExpire(timeLeft, picture._id)
})
