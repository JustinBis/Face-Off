import React from 'react';


/**
 * Link from Feed to specific bet
 */
export default class BetLink extends React.Component {
	constructor(props) {
		super(props);
		var id = this.props.id;
		this.betPath = FlowRouter.path('App.bet',{},{id:id});
	}

	render() {
		return (
			<div>
				<a className="uk-position-cover" href={this.betPath}></a>
			</div>
		);
	}
}
