import React from 'react';
import ChoiceList from './ChoiceList.jsx';

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
	}

	render() {
		var betStyle = { 
			"backgroundImage": "url("+this.props.image.pictureData+")" 
		};
		return (
			<div id="phone-body">
				<div id="bet" style={betStyle} >
					<a className="back-btn" href="/feed">
						<i className="uk-icon-arrow-circle-left"></i>
					</a>
					<ChoiceList choices={this.state.choices} />
				</div>
			</div>
			);
	}
}

Bet.propTypes = {
	image: React.PropTypes.object.isRequired
};





