import React from 'react';

/**
	List of choices the user can select to guess the emoji
*/
export default class ChoiceList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var choices = this.props.choices.map( (emojiUrl) => {
						return (<Choice key={emojiUrl} emojiUrl={emojiUrl} placeBet={this.props.placeBet} />);
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
		this.placeBet = this.placeBet.bind(this);
	}

	placeBet() {
		this.props.placeBet.placeBet(this.props.emojiUrl);
	}

	render() {
		return (
			<div className="choice" onClick={this.placeBet}>
				<img src={this.props.emojiUrl}/>
			</div>
		);
	}
}