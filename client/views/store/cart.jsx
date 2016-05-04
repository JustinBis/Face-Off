import React from 'react';

export default class Cart extends React.Component {

	render() {
		var visibility = this.props.isEmpty ? 'invisible' : '';
		return (
			<div>
				<button id='checkout' type='button' className={visibility} onClick={this.props.checkout.purchaseItems}>BUY</button>
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