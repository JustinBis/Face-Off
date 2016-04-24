import React from 'react';
import { Meteor } from 'meteor/meteor';
import reportError from '../../../imports/ui/report-error';
import { getRandomEmoji, emojiStringToHTML } from '../../../imports/api/emoji-util';

// When they submit the photo and have a review screen, add random notes like "lookin' good!" or things like that

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			selected_emoji: getRandomEmoji()
		};

		// Event Bindings (simulate auto binding of keyword this)
		this.newRandomEmoji = this.newRandomEmoji.bind(this);
		this.takePicture = this.takePicture.bind(this);
  	}

	render() {
		// For compatibility with React's dangerouslySetInnerHTML
		var emoji_html = {__html: emojiStringToHTML(this.state.selected_emoji)};

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

	/**
	 * Stores a new random emoji in the state of this React component
	 * @return {void} This function does not return a value
	 */
	newRandomEmoji() {
		this.setState({selected_emoji: getRandomEmoji()});
	}

}