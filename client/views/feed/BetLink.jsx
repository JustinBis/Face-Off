import React from 'react';


/**
 * Link from Feed to specific bet
 */
export default class BetLink extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		FlowRouter.go('App.bet',{},{id:this.props.id});
	}

	render() {
		return (
			<div>
				<a className="uk-position-cover" onClick={this.onClick} onTap={this.onClick}></a>
			</div>
		);
	}
}
