import {IMAGE_DURATION_MILLIS} from '../api/pictures.js';

/**
 * Format miliseconds as will be rendered by the CountdownTimer react component (used in the feed)
 * @param  Number milliseconds miliseconds to countdown at
 * @return String              Formatted countdown string
 */
export function formatFunc(milliseconds) {
  var totalSeconds = Math.round(milliseconds / 1000);

  var seconds = parseInt(totalSeconds % 60, 10);
  var minutes = parseInt(totalSeconds / 60, 10) % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return minutes + ':' + seconds;
}


/**
 * Returns the amount of milliseconds remaining before a given image expires
 * @param  {Date} createdAt 	Date the image was created at
 * @param  Number duration 		Duration the image lasts for after being created
 * @return Number timeLeft      Milliseconds remaining on images lifetime
 */
export function getTimeRemaining(createdAt) {
	var now = new Date();
	return IMAGE_DURATION_MILLIS - (now - createdAt)
}