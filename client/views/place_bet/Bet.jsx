import React from 'react';
import ChoiceList from './ChoiceList.jsx';
import reportError from '../../../imports/ui/report-error';

/**
	Root element of Bet placement page, responsible for setting background image
	(the image to be guessed), as well as 4 emojis (one of which is the correct emoji)
*/

export default class Bet extends React.Component {
	constructor(props) {
		super(props);
		var choices = [ "images/emojis/toungue.png",
						"images/emojis/kiss.png",
						"images/emojis/open_smile.png",
						"images/emojis/blush.png"];
		this.state = { choices:choices };
		this.placeBet = this.placeBet.bind(this);
	}

	/**
	 * Occurs when given emoji choice is clicked, adds user to updated bets in the pictures collection
	 * @param  {[type]} emojiId unique emoji identifier
	 */
	placeBet(emojiId){
		var pictureId = this.props.image._id;
		Meteor.call('pictures.updateBets', pictureId, function (err) {
			if (err) {
				reportError(err);
			}
		});
	}

	render() {
		var betStyle = { 
			"backgroundImage": "url("+this.props.image.pictureData+")" 
		};
		//TODO LOL WHY IS THIS NECESSARY (try and pass in just the function on its own)
		var placeBet = {placeBet:this.placeBet}
		return (
			<div id="phone-body">
				<div id="bet" style={betStyle} >
					<a className="back-btn" href="/feed">
						<i className="uk-icon-arrow-circle-left"></i>
					</a>
					<ChoiceList choices={this.state.choices} placeBet={placeBet} pictureId={this.props.image._id}/>
				</div>
			</div>
			);
	}
}

Bet.propTypes = {
	image: React.PropTypes.object.isRequired
};





