import React from 'react';

import Item from './item.jsx';
import Cart from './cart.jsx';

export default class Store extends React.Component {

	constructor(props) {
		super(props);
		this.state = {total: 0, emptyCart: 1};
		var num = 1347;
		this.funds = num.toLocaleString();
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

	updateCart(amount) {
		var total = this.state.total + amount;
		this.setState({total: total});
		if (this.state.emptyCart && total){
			this.setState({emptyCart: 0});
		}
		else if (!this.state.emptyCart && !total){
			this.setState({emptyCart: 1});
		}
	}

	renderItems() {
		return this.getItems().map((item) => (
				<Item key={item._id} item={item} increaseAmount={{updateCart: this.updateCart.bind(this)}}/>
			)
		);
	}

	render() {
		return (
			<div id='outer-container'>
				<div id='contents'>
					<div id='item-list'>
						<ul>
							{this.renderItems()}
						</ul>
					</div>
					<div id='right-content'>
						<div id='money-pile'>
							<div className='money-tag'>
								<img className='coin' src='http://www.clipartbest.com/cliparts/xig/oE9/xigoE9ERT.png'/>
								<p>{this.funds}</p>
							</div>
						</div>
						<Cart price={this.state.total.toLocaleString()} isEmpty={this.state.emptyCart}/>
					</div>
				</div>
			</div>
		);
	}
}

