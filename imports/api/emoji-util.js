const possibleEmojis = ['\ud83d\ude00','\ud83d\ude2c','\ud83d\ude01','\ud83d\ude02','\ud83d\ude03','\ud83d\ude04','\ud83d\ude05','\ud83d\ude06','\ud83d\ude07','\ud83d\ude09','\ud83d\ude0a','\ud83d\ude42','\ud83d\ude43','\u263a\ufe0f','\ud83d\ude0b','\ud83d\ude0c','\ud83d\ude0d','\ud83d\ude18','\ud83d\ude17','\ud83d\ude19','\ud83d\ude1a','\ud83d\ude1c','\ud83d\ude1d','\ud83d\ude1b','\ud83e\udd11','\ud83e\udd13','\ud83d\ude0e','\ud83e\udd17','\ud83d\ude0f','\ud83d\ude36','\ud83d\ude10','\ud83d\ude11','\ud83d\ude12','\ud83d\ude44','\ud83e\udd14','\ud83d\ude33','\ud83d\ude1e','\ud83d\ude1f','\ud83d\ude20','\ud83d\ude21','\ud83d\ude14','\ud83d\ude15','\ud83d\ude41','\u2639\ufe0f','\ud83d\ude23','\ud83d\ude16','\ud83d\ude2b','\ud83d\ude29','\ud83d\ude24','\ud83d\ude2e','\ud83d\ude31','\ud83d\ude28','\ud83d\ude30','\ud83d\ude2f','\ud83d\ude26','\ud83d\ude27','\ud83d\ude22','\ud83d\ude25','\ud83d\ude2a','\ud83d\ude13','\ud83d\ude2d','\ud83d\ude35','\ud83d\ude32','\ud83e\udd10','\ud83d\ude37','\ud83e\udd12','\ud83e\udd15','\ud83d\ude34'];

/**
 * Selects a random emoji from the group of possible emojis
 * @return {string} A string representing the emoji to display
 */
export function getRandomEmoji() {
	// Why doesn't ES6 support unicode for real yet? Damnit javascript 😡
	//var possibleEmojis = [😀,😬,😁,😂,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤗,😏,😶,😐,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,🙁,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,😪,😓,😭,😵,😲,🤐,😷,🤒,🤕,😴];
	var randomEmoji = possibleEmojis[Math.floor(Math.random() * possibleEmojis.length)];
	return randomEmoji;
}

/**
 * Get's 4 options for a given picture, including the 'correct' emoji choice
 * @return [String] Array of emojiID's (length 4)
 */
//TODO Currently the correct answer is always the 1st choice, 
//	   and there is the potential of duplicate choices
export function getOptions(emoji) {
	var options = [emoji];
	for(var i = 0; i < 3; i++) {
		//Ensure unique emoji selected
		var randEmoji = getRandomEmoji();
		if(!randEmoji || options.indexOf(randEmoji) !== -1) {
			i--;
			console.log(randEmoji, emoji);
		} else {	
			options.push( randEmoji );
		}
	}
	//Shuffle emojis
	for(var i = options.length-1; i > 0; i--) {
		var randInd = Math.floor(Math.random() * (i-1));
		var temp = options[randInd]
		options[randInd] = options[i];
		options[i] = temp;
	}

	return options;
}


/**
 * Converts a unicode string representing an emoji to an HTML img tag for that emoji
 * @param  {string} emoji a unicode string with a single character representing the emoji
 * @return {string}       the HTML string containing an img tag for the given emoji
 */
export function emojiStringToHTML(emoji) {
	return twemoji.parse(emoji, {
		folder: 'svg',
		ext: '.svg'
	})
}