import React from 'react';
import classNames from 'classnames';

import Item from './item.jsx';
import Cart from './cart.jsx';
import ItemCard from './item-card.jsx';

export default class Store extends React.Component {

	constructor(props) {
		super(props);
		this.state = {total: 0, emptyCart: 1, sufficientFunds: 1, purchasing: 0};
		this.funds = 247;
		this.toBuy = [];
	}

	getItems() {
		return [
			{_id: 1, name: 'hat', price: 50, url: 'http://images.clipartpanda.com/hat-clip-art-nicubunu_Adventurer_hat_Vector_Clipart.png'},
			{_id: 2, name: 'monocle', price: 60, url: 'http://worldartsme.com/images/monocle-clipart-1.jpg'},
			{_id: 3, name: 'sunglasses', price: 20, url: 'http://images.clipartpanda.com/sunglasses-clipart-9TRBdEjTe.svg'},
			{_id: 4, name: 'hat', price: 50, url: 'http://images.clipartpanda.com/hat-clip-art-nicubunu_Adventurer_hat_Vector_Clipart.png'},
			{_id: 5, name: 'monocle', price: 60, url: 'http://worldartsme.com/images/monocle-clipart-1.jpg'},
			{_id: 6, name: 'sunglasses', price: 20, url: 'http://images.clipartpanda.com/sunglasses-clipart-9TRBdEjTe.svg'},
			{_id: 7, name: 'hat', price: 50, url: 'http://images.clipartpanda.com/hat-clip-art-nicubunu_Adventurer_hat_Vector_Clipart.png'},
			{_id: 8, name: 'monocle', price: 60, url: 'http://worldartsme.com/images/monocle-clipart-1.jpg'},
			{_id: 9, name: 'sunglasses', price: 20, url: 'http://images.clipartpanda.com/sunglasses-clipart-9TRBdEjTe.svg'},
			{_id: 10, name: 'hat', price: 50, url: 'http://images.clipartpanda.com/hat-clip-art-nicubunu_Adventurer_hat_Vector_Clipart.png'},
			{_id: 11, name: 'monocle', price: 60, url: 'http://worldartsme.com/images/monocle-clipart-1.jpg'},
			{_id: 12, name: 'sunglasses', price: 20, url: 'http://images.clipartpanda.com/sunglasses-clipart-9TRBdEjTe.svg'},
		]
	}

	updateCart(add, item) {
		var total;
		if (add) {
			total = this.state.total + item.price;
			this.toBuy.push(item);
		}
		else {
			total = this.state.total - item.price;
			this.toBuy.splice(this.toBuy.indexOf(item), 1);
		}
		this.setState({total: total});
		if (this.state.emptyCart && total){
			this.setState({emptyCart: 0});
		}
		else if (!this.state.emptyCart && !total){
			this.setState({emptyCart: 1});
		}
	}

	purchaseItems() {
		if (this.state.sufficientFunds) {
			if (this.state.total > this.funds) {
				this.setState({sufficientFunds: 0});
			}
			else {
				this.setState({purchasing: 1});
			}
		}
	}

	hideInsufficientFundsPopUp() {
		this.setState({sufficientFunds: 1});
	}

	hidePuchasingPopUp() {
		this.setState({purchasing: 0});
	}

	renderItems() {
		return this.getItems().map((item) => (
				<Item key={item._id} item={item} increaseAmount={{updateCart: this.updateCart.bind(this)}} sufficientFunds={this.state.sufficientFunds}/>
			)
		);
	}

	renderCartItems() {
		return this.toBuy.map((item) => (
				<li key={item._id}>
					<ItemCard item={item} />
				</li>
			)
		);
	}

	render() {
		var insufficientFundsVisibility = this.state.sufficientFunds ? 'invisible' : '';
		var purchasingVisibility = this.state.purchasing ? '' : 'invisible';
		var tagVisibility = (this.toBuy.length - 1) ? '' : 'invisible';
		return (
			<div id='outer-container'>
				<div id='contents'>
					<div id='item-list'>
						<ul id='items'>
							{this.renderItems()}
						</ul>
					</div>
					<div id='right-content'>
						<div id='money-pile'>
							<div className='money-tag'>
								<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
								<p>{this.funds.toLocaleString()}</p>
							</div>
						</div>
						<Cart price={this.state.total.toLocaleString()} isEmpty={this.state.emptyCart} checkout={{purchaseItems: this.purchaseItems.bind(this)}}/>
					</div>
					<div id='insufficient-funds' className={insufficientFundsVisibility}>
						<p id='funds-info-p'>You don't have enough coins. Earn coins by making bets.</p>
						<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
						<p id='curr-funds-p'>{this.funds.toLocaleString()}</p>
						<button className='pop-up-button' type='button' onClick={this.hideInsufficientFundsPopUp.bind(this)}>OK</button>
					</div>
					<div id='purchasing' className={purchasingVisibility}>
						<ul id='checkout-list'>
							{this.renderCartItems()}
						</ul>
						<button id='confirm-button' className='pop-up-button' type='button' onClick={this.hidePuchasingPopUp.bind(this)}>
							<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
							<p>{this.state.total.toLocaleString()}</p>
						</button>
						<button className='pop-up-button' type='button' onClick={this.hidePuchasingPopUp.bind(this)}>CANCEL</button>
					</div>
				</div>
			</div>
		);
	}
}