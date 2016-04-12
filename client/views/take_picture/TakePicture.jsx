import React from 'react';
import { Meteor } from 'meteor/meteor';
import reportError from '../../../imports/ui/report-error';

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			selected_emoji: this.getRandomEmoji()
		};

		// Event Bindings (simulate auto binding of keyword this)
		this.newRandomEmoji = this.newRandomEmoji.bind(this);
		this.takePicture = this.takePicture.bind(this);
  	}

	render() {
		// Use Twemoji to convert the emoji to an img tag using our images as sources
		var parsed_emoji = twemoji.parse(this.state.selected_emoji, {
			folder: 'svg',
			ext: '.svg'
		});

		// For compatibility with React's dangerouslySetInnerHTML
		var emoji_html = {__html: parsed_emoji};

		var view = (<div id="take-picture">
			<h1>Make This Face</h1>
			<div className="emoji-container" dangerouslySetInnerHTML={emoji_html}>
			</div>
			<div className="uk-button-group">
				<button className="uk-button uk-button-large uk-button-primary" onClick={this.newRandomEmoji}>New Emoji</button>
				<button className="uk-button uk-button-large uk-button-primary" onClick={this.takePicture}>Take a Selfie</button>
			</div>
			</div>);

		return view;
	}

	takePicture() {
		MeteorCamera.getPicture({}, (err, data) => {
			if(err)
			{
				if(err.error == "cancel")
				{
					// The user cancelled the photo, so silently exit
					return;
				}
				reportError(err);
				return;
			}

			// TODO: add a better review sceen for pictures (possibly invoked here)
			this.savePictureToDB(data, this.state.selected_emoji);
		});
	}

	/**
	 * Saves a picture and its associated emoji to the database
	 * @param  {string} pictureData the image data, stored as a Base64 encoded 
	 *                  string that can be used in the 'src' of an img tag
	 * @param  {string} emoji the emoji that corresponds to this picture, represented as a unicode string
	 * @return {void}      This function returns nothing
	 */
	savePictureToDB(pictureData, emoji) {
		Meteor.call('pictures.insert', pictureData, emoji, (err) => {
			if(err)
			{
				this.reportError(err);
			}
		});
	}

	// Logic helper methods
	
	/**
	 * Converts a unicode string representing an emoji to an HTML img tag for that emoji
	 * @param  {string} emoji a unicode string with a single character representing the emoji
	 * @return {string}       the HTML string containing an img tag for the given emoji
	 */
	emojiStringToHTML(emoji) {
		// TODO: implement this and replace the rendering code
	}

	/**
	 * Stores a new random emoji in the state of this React component
	 * @return {void} This function does not return a value
	 */
	newRandomEmoji() {
		this.setState({selected_emoji: this.getRandomEmoji()});
	}
	
	/**
	 * Selects a random emoji from the group of possible emojis
	 * @return {string} A string representing the emoji to display
	 */
	getRandomEmoji() {
		// Why doesn't ES6 support unicode for real yet? Damnit javascript 😡
		//var possibleEmojis = [😀,😬,😁,😂,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤗,😏,😶,😐,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,🙁,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,😪,😓,😭,😵,😲,🤐,😷,🤒,🤕,😴];
		var possibleEmojis = ['\ud83d\ude00','\ud83d\ude2c','\ud83d\ude01','\ud83d\ude02','\ud83d\ude03','\ud83d\ude04','\ud83d\ude05','\ud83d\ude06','\ud83d\ude07','\ud83d\ude09','\ud83d\ude0a','\ud83d\ude42','\ud83d\ude43','\u263a\ufe0f','\ud83d\ude0b','\ud83d\ude0c','\ud83d\ude0d','\ud83d\ude18','\ud83d\ude17','\ud83d\ude19','\ud83d\ude1a','\ud83d\ude1c','\ud83d\ude1d','\ud83d\ude1b','\ud83e\udd11','\ud83e\udd13','\ud83d\ude0e','\ud83e\udd17','\ud83d\ude0f','\ud83d\ude36','\ud83d\ude10','\ud83d\ude11','\ud83d\ude12','\ud83d\ude44','\ud83e\udd14','\ud83d\ude33','\ud83d\ude1e','\ud83d\ude1f','\ud83d\ude20','\ud83d\ude21','\ud83d\ude14','\ud83d\ude15','\ud83d\ude41','\u2639\ufe0f','\ud83d\ude23','\ud83d\ude16','\ud83d\ude2b','\ud83d\ude29','\ud83d\ude24','\ud83d\ude2e','\ud83d\ude31','\ud83d\ude28','\ud83d\ude30','\ud83d\ude2f','\ud83d\ude26','\ud83d\ude27','\ud83d\ude22','\ud83d\ude25','\ud83d\ude2a','\ud83d\ude13','\ud83d\ude2d','\ud83d\ude35','\ud83d\ude32','\ud83e\udd10','\ud83d\ude37','\ud83e\udd12','\ud83e\udd15','\ud83d\ude34'];

		var randomEmoji = possibleEmojis[Math.floor(Math.random() * possibleEmojis.length)];
		return randomEmoji;
	}
}