import React from 'react';

/* Visual representation of an amount of money */

export default class MoneyTag extends React.Component {

	render() {
		return (
			<div className='money-tag'>
				<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
				<p>{this.props.price}</p>
			</div>
		)
	}
}