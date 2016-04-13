import React from 'react';

export default class BetLink extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.name);
	}

	onClick() {
		FlowRouter.go('App.bet');
	}


	render() {
		return (
			<div>
				<a className="uk-position-cover" onClick={this.onClick}></a>
			</div>
		);
	}
}
