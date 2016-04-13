import React from 'react';


/**
	Root element of Bet placement page, responsible for setting background image
	(the image to be guessed), as well as 4 emojis (one of which is the correct emoji)
*/
export default class PlaceBet extends React.Component {
	constructor(props) {
		super(props);
		var choices = [ "images/emojis/toungue.png",
						"images/emojis/kiss.png",
						"images/emojis/open_smile.png",
						"images/emojis/blush.png"];
		this.state = { choices:choices };
	}

	render() {
		return (
			<div id="phone-body">
				<div id="bet">
					<a className="back-btn" href="/feed">
						<i className="uk-icon-arrow-circle-left"></i>
					</a>
					<ChoiceList choices={this.state.choices} />
				</div>
			</div>
			);
	}
}

/**
	List of choices the user can select to guess the emoji
*/
class ChoiceList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var choices = this.props.choices.map( (emojiUrl) => {
						return (<Choice key={emojiUrl} emojiUrl={emojiUrl} />);
					});
		return (
			<div className="choices-container">
				{ choices }
			</div>
		);
	}
}

/**
	Specific emoji a user can select (guess/bet)
*/
class Choice extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="choice">
				<img src={this.props.emojiUrl}/>
			</div>
		);
	}
}