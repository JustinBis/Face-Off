import React from 'react';
import {emojiStringToHTML} from '../../../imports/api/emoji-util.js';

/**
	List of choices the user can select to guess the emoji
*/
export default class ChoiceList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var choices = this.props.choices.map( (emojiString, ind) => {
						return (<Choice key={ind} emoji={emojiString} placeBet={this.props.placeBet} />);
					});
		return (
			<div className="choices-container">
				{ choices }
			</div>
		);
	}
}

ChoiceList.propTypes = {
	choices: React.PropTypes.array.isRequired
};

/**
	Specific emoji a user can select (guess/bet)
*/
class Choice extends React.Component {
	constructor(props) {
		super(props);
		this.placeBet = this.placeBet.bind(this);
	}

	placeBet() {
		this.props.placeBet.placeBet(this.props.emoji);
	}

	render() {
		emoji_html = {__html:emojiStringToHTML(this.props.emoji)};
		return (
			<div className="choice" onClick={this.placeBet} onTap={this.placeBet}>
				<div dangerouslySetInnerHTML={emoji_html}>
				</div>
			</div>
		);
	}
}