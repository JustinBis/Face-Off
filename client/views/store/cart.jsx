import React from 'react';

export default class Cart extends React.Component {

	render() {
		var visibility = this.props.isEmpty ? 'invisible' : '';
		console.log(visibility);
		return (
			<div>
				<button id='checkout' type='button' className={visibility}>BUY</button>
				<div id='cart' >
					<div className='money-tag'>
						<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
						<p>{this.props.price}</p>
					</div>
				</div>
			</div>
		);
	}
}