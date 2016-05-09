import React from 'react';

/* Visual representation of an item that includes a picture of the item and its price */

export default class ItemCard extends React.Component {
	render() {
		return (
			<div className='item-card'>
				<img className='item-pic' src={this.props.item.url}/>
				<div className='price'>
					<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
					<p>{this.props.item.price}</p>
				</div>
			</div>
		)
	}
}