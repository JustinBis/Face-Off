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