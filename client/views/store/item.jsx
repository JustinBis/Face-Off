import React from 'react';
import classNames from 'classnames';

import ItemCard from './item-card.jsx';

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isSelected: false};
	}

	onClick() {
		if (this.props.ready) {
			var isSelected = !this.state.isSelected;
			this.setState({isSelected: isSelected});
			this.props.increaseAmount.updateCart(isSelected, this.props.item);
		}
	}

	render() {
		var item = this.props.item;
		var selected = this.state.isSelected ? ' selected' : '';
		var classes = classNames('item', selected);
		return (
			<li>
				<div className={classes} onClick={this.onClick.bind(this)} >
					<ItemCard item={this.props.item} />
				</div>
			</li>
		);
	}
	
	toggleSelect() {
		this.setState({isSelected: !this.state.isSelected});
	}
}