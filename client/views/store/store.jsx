import React from 'react';
import classNames from 'classnames';
import HashMap from 'hashmap';

import Item from './item.jsx';
import ItemCard from './ItemCard.jsx';
import MoneyTag from './MoneyTag.jsx';
import reportError from '../../../imports/ui/report-error';

/**
	Main class for the store containing the list of items that users can buy, the cart that items are added to, the 
	button to buy an item, the door to exit back to the feed, and the pop ups to confirm purchases or notify the user
	that they don't have enough coins to buy what's in their cart.
**/

export default class Store extends React.Component {

	constructor(props) {
		super(props);
		this.state = {total: 0, emptyCart: 1, sufficientFunds: 1, purchasing: 0};
		this.cart = new HashMap();
	}

	/* Add or remove and item from the cart */
	updateCart(add, item) {
		var total;
		if (add) {
			total = this.state.total + item.price;
			this.cart.set(item._id, item);
		}
		else {
			total = this.state.total - item.price;
			this.cart.remove(item._id);
		}
		this.setState({total: total});
		if (this.state.emptyCart && total){
			this.setState({emptyCart: 0});
		}
		else if (!this.state.emptyCart && !total){
			this.setState({emptyCart: 1});
		}
	}

	/* If there is not currently a pop up, check if user has enough money to buy what's in the cart and change states 
	accordingly so the correct pop up appears */
	purchaseItems() {
		if (this.state.sufficientFunds && !this.state.purchasing) {
			if (this.state.total > this.props.funds) {
				this.setState({sufficientFunds: 0});
			}
			else {
				this.setState({purchasing: 1});
			}
		}
	}

	/* Add the purchase information to the database and update variables to signify that the purchase was completed */
	confirmPurchase() {
		var toBuy = this.cart.values();
		var len = toBuy.length;
		for (i = 0; i < len; i++) {
			Meteor.call('purchases.insert', toBuy[i]._id, toBuy[i].url, toBuy[i].price);
		}
		this.cart.clear();
		this.props.funds = this.props.funds - this.state.total;
		this.setState({total: 0});
		this.setState({emptyCart: 1});
		this.setState({purchasing: 0});
	}

	/* Return to feed */
	toCamera() {
		if (this.state.sufficientFunds && !this.state.purchasing) {
			FlowRouter.go('App.camera');
		}
	}

	/* Hide pop up for insufficient funds */
	hideInsufficientFunds() {
		this.setState({sufficientFunds: 1});
	}

	/* Hide pop up for purchase confirmation */
	hidePurchasing() {
		this.setState({purchasing: 0});
	}

	/* Create the list of available items to buy */
	renderItems() {
		return this.props.available.map((item) => (
				<Item key={item._id} item={item} increaseAmount={{updateCart: this.updateCart.bind(this)}} ready={this.state.sufficientFunds && !this.state.purchasing}/>
			)
		);
	}

	/* Create the visual representation of items in the cart for the confirmation pop up*/
	renderCartItems() {
		var items = this.cart.values();
		return items.map((item) => (
				<li key={item._id}>
					<ItemCard item={item} />
				</li>
			)
		);
	}

	render() {
		var insufficientFundsVisibility = this.state.sufficientFunds ? 'invisible' : '';
		var purchasingVisibility = this.state.purchasing ? '' : 'invisible';
		var buyButtonVisibility = this.state.emptyCart ? 'invisible' : '';
		return (
			<div id='outer-container'>
				<div id='contents'>
					<div id='item-list'>
						<ul id='items'>
							{this.renderItems()}
						</ul>
					</div>
					<ul id='right-content'>
						<li><img id='door' src='http://images.clipartpanda.com/door-clipart-open-door.png' onClick={this.toCamera.bind(this)} /></li>
						<li><div id='money-pile'>
							<MoneyTag price={this.props.funds} />
						</div></li>
						<li><div id='cart' >
							<MoneyTag price={this.state.total} />
						</div></li>
						<li><button id='checkout' type='button' className={buyButtonVisibility} onClick={this.purchaseItems.bind(this)}>BUY</button></li>
					</ul>
					<div id='insufficient-funds' className={insufficientFundsVisibility}>
						<p id='funds-info-p'>You don't have enough coins. Earn coins by making bets.</p>
						<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
						<p id='curr-funds-p'>{this.props.funds.toLocaleString()}</p>
						<button className='pop-up-button' type='button' onClick={this.hideInsufficientFunds.bind(this)}>OK</button>
					</div>
					<div id='purchasing' className={purchasingVisibility}>
						<ul id='checkout-list'>
							{this.renderCartItems()}
						</ul>
						<button id='confirm-button' className='pop-up-button' type='button' onClick={this.confirmPurchase.bind(this)}>
							<div id='price-confirm'>
								<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
								<p>{this.state.total.toLocaleString()}</p>
							</div>
						</button>
						<button className='pop-up-button' type='button' onClick={this.hidePurchasing.bind(this)}>CANCEL</button>
					</div>
				</div>
			</div>
		);
	}
}

Store.propTypes = {
  available: React.PropTypes.array.isRequired,
  funds: React.PropTypes.number.isRequired
};















