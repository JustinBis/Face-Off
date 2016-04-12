/**
 * Logs an error and reports it to the user using UIKit notify
 * @param  {Meteor Error Object} err The error to report
 * @param  {string} prefix The string to include before the error
 * @return {void} This function does not return anythijg
 */
export default function reportError(err, prefix) {
	var errorString;
	if(prefix)
	{
		errorString = `${prefix} ${err.reason}`;
	}
	else
	{
		errorString = `Error: ${err.reason}`;
	}
	console.error(errorString);

	// Relay this error to the user
	if(UIkit && UIkit.notify && err && err.reason)
	{
		UIkit.notify(errorString, 'danger');
	}
}