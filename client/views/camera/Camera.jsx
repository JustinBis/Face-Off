import React from 'react';
import { Meteor } from 'meteor/meteor';
import reportError from '../../../imports/ui/report-error';

// When they submit the photo and have a review screen, add random notes like "lookin' good!" or things like that

// The quality factor to use for images (0-100)
const QUALITY = 80;

// The height and width of the viewfinder and the image we wish to take
const IMAGE_HEIGHT = 480;
const IMAGE_WIDTH = 360;

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			needsCameraPermission: true,
			selectedEmoji: this.getRandomEmoji()
		};

		this._video = null;
		this._canvas = null;

		// Event Bindings (simulate auto binding of keyword this)
		this.newRandomEmoji = this.newRandomEmoji.bind(this);
		this.takePicture = this.takePicture.bind(this);
  	}

  	componentDidMount() {
		if(Meteor.isCordova)
		{
			// TODO: Jump to native camera on phones
		}
		else
		{
			// Prep the camera web page
			this.fixGetUserMediaFunction();
			if(!navigator.getUserMedia)
			{
				// This browser doesn't support getUserMedia
				console.log("This browser doesn't support getUserMedia");
				this.setState({notSupported: true});
				return;
			}

			// Initiate a request for camera access
			navigator.getUserMedia({
				video: true,
				audio: false
  			},
  			// Success callback
  			(stream) => {
  				// Crate the canvas element needed to capture frames from the video
  				this._canvas = document.createElement("canvas");

  				this.setState({needsCameraPermission: false});

  				// Setup the video source URL
  				var vendorURL = window.URL || window.webkitURL
  				this.setState({
  					videoSrc: vendorURL.createObjectURL(stream),
  					videoSrcObject: stream
  				});


  			},
  			// Failure callback
  			(err) => {
  				var prefix = "Error accessing camera:";
  				if(err.name == "PermissionDeniedError" || err.name == "PERMISSION_DENIED")
  				{
  					err.reason = "Permission to use the camera was denied";
  					reportError(err, prefix);
  				}
  				else if(err.name == "NotFoundError")
  				{
  					err.reason = "Camera could not be found by the browser";
  					reportError(err, prefix);
  				}
  				else
  				{
  					err.reason = `Unknown error (${err.name})`;
  					reportError(err, prefix);
  				}
  			});
		}
	}

	render() {
		// TODO: Make these individual react components for better organization
		var view;
		if(this.state.notSupported)
		{
			// TODO: Make this message not so crappy
			view = (<h1>Sorry, your browser does not support camera access</h1>)
		}
		else if(this.state.needsCameraPermission)
		{
			// TODO: Make this message not so crappy
			view = (<h1>Please Allow Camera Permissions</h1>);

		}
		else
		{
			view = (
				<div className='viewfinder'>
					<video id='camera-preview'
						ref={(ref) => this._video = ref}
						onLoadedMetadata={this.onloadedmetadata}
						src={this.state.videoSrc}
						srcObject={this.state.videoSrcObject}
						mozSrcObject={this.state.videoSrcObject}
					></video>
					<div className='overlay'>
						<button className='exit'>Exit</button>
						<div className='bottom-row'>
							<div>
								<button onClick={this.newRandomEmoji} className='shutter'>New Emoji</button>
							</div>
							<div>
								<button onClick={this.takePicture} className='shutter'>Shutter</button>
							</div>
							<div>
								<button className='shutter'>Items</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div id='camera'>
				{view}
			</div>
			);
	}

	/**
	 * Event callback for the video viewfinder -- will be called when the source has loaded.
	 * This will cause the video to start playing
	 * @param  {Event Object} e The event object
	 * @return {[type]}   This method doesn't return anything
	 */
	onloadedmetadata(e) {
		e.target.play();
	}

	/**
	 * Fixes the navigator.getUserMedia function used by this browser (if it has one at all)
	 * This will mutate the global navigator object to set navigator.getUserMedia (without a browser prefix) if it isn't set already
	 * (I can't believe this is necessary. How is this not standardized by now?)
	 * @return {function} navigator.getUserMedia - the function to capture video and audio media from the user
	 *                                           Will return `undefined` if the browser is unsupported
	 */
	fixGetUserMediaFunction() {
		// Attempt to consolidate the many browser prefixes for `getUserMedia`
		navigator.getUserMedia = (
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
		return navigator.getUserMedia;
	}

	/**
	 * Saves a frame from the current camera feed.
	 * This relies on this._video and this._canvas being defined and ready to use
	 * (i.e. they must be active DOM elements and the video must be playing)
	 *
	 * This function will store the picture data in this component's state under 'pictureData'
	 * as a Base64 encoded string that can be used as the src of an img tag
	 * 
	 * @return {null} This method saves its result in the state of this component
	 */
	takePicture() {
		if(this._video === null || this._canvas === null)
		{
			reportError("Error taking picture: internal video error");
			return;
		}

		var video = this._video;
		//var videoWidth = video.videoWidth;
		//var videoHeight = video.videoHeight;
		
		// Since the viewfinder is centered on the video, we need to extract a center frame of the video
		// so we calculate the difference between the video width and the viewfinder width and divide by two
		// to get the size of the left and right margins
		var leftMargin = Math.floor( (video.videoWidth - IMAGE_WIDTH) / 2 );

		var canvas = this._canvas;

		// set the canvas height and width
		canvas.height = IMAGE_HEIGHT;
		canvas.width = IMAGE_WIDTH;

		canvas.getContext('2d').drawImage(video, leftMargin, 0, IMAGE_WIDTH, video.videoHeight, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
		var pictureData = canvas.toDataURL('image/jpeg', QUALITY);

		this.setState({pictureData});
	}


	/**
	 * Saves a picture and its associated emoji to the database
	 * @param  {string} pictureData the image data, stored as a Base64 encoded 
	 *                  string that can be used in the 'src' of an img tag
	 * @param  {string} emoji the emoji that corresponds to this picture, represented as a unicode string
	 * @return {void}      This function returns nothing
	 */
	savePicture(pictureData, emoji) {
		Meteor.call('pictures.insert', pictureData, emoji, (err) => {
			if(err)
			{
				reportError(err, "Error saving picture:");
			}
		});
	}

	/**
	 * Converts a unicode string representing an emoji to an HTML img tag for that emoji
	 * @param  {string} emoji a unicode string with a single character representing the emoji
	 * @return {string}       the HTML string containing an img tag for the given emoji
	 */
	emojiStringToHTML(emoji) {
		return twemoji.parse(emoji, {
			folder: 'svg',
			ext: '.svg'
		})
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