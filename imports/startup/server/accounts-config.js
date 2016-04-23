
/**
 * Responsible for handling additional fields ( on top of the ones created by Facebook) when an account is created
 * Currently the only custom behavior is the addition of a "score" field
 * @param  {} options 		Standard options from account creation]
 * @param  {} user   		user to be added
 * @return {} user        	modified user
 */
Accounts.onCreateUser(function (options, user) {
	var startingScore = 1000;
	user.score = startingScore;
	if (options.profile) {
		user.profile = options.profile;
	}
	return user;
});