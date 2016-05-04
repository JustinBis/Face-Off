import React from 'react';
import classNames from 'classnames';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isSelected: false};
	}

	onClick() {
		if (this.props.sufficientFunds) {
			var isSelected = !this.state.isSelected;
			this.setState({isSelected: isSelected});
			this.props.increaseAmount.updateCart((2 * isSelected - 1) * this.props.item.price);
		}
	}

	render() {
		var item = this.props.item;
		var selected = this.state.isSelected ? ' selected' : '';
		var classes = classNames('item', selected);
		return (
			<li>
				<div className={classes} onClick={this.onClick.bind(this)} >
					<img className='item-pic' src={item.url}/>
					<div className='price'>
						<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
						<p>{item.price}</p>
					</div>
				</div>
			</li>
		);
	}
	
	toggleSelect() {
		this.setState({isSelected: !this.state.isSelected});
	}
}