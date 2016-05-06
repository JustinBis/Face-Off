import React from 'react';

export default class ItemCard extends React.Component {
	render() {
		return (
			<div>
				<img className='item-pic' src={this.props.item.url}/>
				<div className='price'>
					<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
					<p>{this.props.item.price}</p>
				</div>
			</div>
		)
	}
}