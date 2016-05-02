import React from 'react';
import ChoiceList from './ChoiceList.jsx';
import reportError from '../../../imports/ui/report-error';
import Loading from '../../../imports/ui/Loading';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
	Root element of Bet placement page, responsible for setting background image
	(the image to be guessed), as well as 4 emojis (one of which is the correct emoji)
*/

export default class Bet extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props)

		this.placeBet = this.placeBet.bind(this);
		this.transitionTime = 1000;
		this.state = {betPlaced:false};
	}

	/**
	 * Occurs when given emoji choice is clicked, adds user to updated bets in the pictures collection
	 * and inserts bet to bets collection, simultaneously updating user's score
	 * @param  {[type]} emojiId unique emoji identifier
	 */
	placeBet(emojiId) {
		var pictureId = this.props.image._id;
		Meteor.call('pictures.updateBets', pictureId, function (err) {
			if (err) {
				reportError(err);
			}
		});
		Meteor.call('bets.insert', pictureId, emojiId, function (err) {
			if (err) {
				reportError(err);
			}
		});
		this.setState({betPlaced:true});

		//ON TRANSITION COMPLETE (as of writing this there is no hook for react )
		setTimeout(()=>{
			FlowRouter.go('App.feed');
		}, this.transitionTime)


	}

	transitionComplete() {
		if( this.state.betPlaced ) {
			console.log("OVER")
		}
	}

	render() {
		if(!this.props.imageReady) {
			return( <Loading /> );
		}

		var betStyle = { 
			"backgroundImage": "url("+this.props.image.pictureData+")" 
		};
		//TODO LOL WHY IS THIS NECESSARY (try and pass in just the function on its own) 
		var placeBet = {placeBet:this.placeBet}

		//Animated div occuring after bet placed
		var betTransition = this.state.betPlaced ? (<div key="ayy" className="bet-response" >
	          				<i className="uk-icon-check"></i>
	          				<div> Correct! </div>
          				</div>) : "";


		return (
			<div id="phone-body">
				<div id="bet" style={betStyle} >					
        			<ReactCSSTransitionGroup 
        				component="div"
        			    transitionName="response"
          				transitionEnterTimeout={this.transitionTime}
          				transitionLeave={false}>
          				{betTransition}
        			</ReactCSSTransitionGroup>
					<ChoiceList choices={this.props.image.options} placeBet={placeBet} pictureId={this.props.image._id}/>
					
				</div>
			</div>
			);
	}
}

Bet.propTypes = {
	image: React.PropTypes.object,
	imageReady: React.PropTypes.bool
};





