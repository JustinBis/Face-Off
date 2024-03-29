import React from 'react';
import classNames from 'classnames';

import ItemCard from './ItemCard.jsx';

/* An item in the store that user can click on to add to cart */

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isSelected: false};
	}

	selectItem() {
			console.log(this.state.isSelected);
		if (this.props.ready) {
			var isSelected = !this.state.isSelected;
			this.setState({isSelected: isSelected});
			this.props.increaseAmount.updateCart(isSelected, this.props.item);
		}
	}

	render() {
		var selected = this.state.isSelected ? ' selected' : '';
		var classes = classNames('item', selected);
		return (
			<li>
				<div className={classes} onClick={this.selectItem.bind(this)} >
					<ItemCard item={this.props.item} />
				</div>
			</li>
		);
	}
	
	toggleSelect() {
		this.setState({isSelected: !this.state.isSelected});
	}
}