import React from 'react';

export default class Cart extends React.Component {

	render() {
		return (
			<div id='cart' >
					<div className='money-tag'>
					<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
					<p>{this.props.price}</p>
				</div>
			</div>
		);
	}
}