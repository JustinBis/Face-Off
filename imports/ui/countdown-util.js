  
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
 * Returns a date object set specifically at "minutes" minutes prior to calling of the function
 * @param  Number 			# Of minutes in the past
 * @return {Date Object} 	Date object representation
 */
export function getMinutesAgo(minutes) {
	var now = new Date();
	var tenMinutes = 1000*60*minutes;
	return new Date(now-tenMinutes);
}


/**
 * Returns the amount of milliseconds remaining before a given image expires
 * @param  {Date} createdAt 	Date the image was created at
 * @param  Number duration 		Duration the image lasts for after being created
 * @return Number timeLeft      Milliseconds remaining on images lifetime
 */
export function getTimeRemaining(createdAt, duration) {
	var durMinutesAgo = getMinutesAgo(duration);
	return createdAt - durMinutesAgo;
}