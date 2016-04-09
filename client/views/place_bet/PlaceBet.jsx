import React from 'react';



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


class ChoiceList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {



		return (
			<div className="choices-container">
				{ this.props.choices.map( (emojiUrl) => {
					return (<Choice key={emojiUrl} emojiUrl={emojiUrl} />);
					})
				}
			</div>
		);
	}
}


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