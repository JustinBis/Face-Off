import React from 'react';
import CountdownTimer from '../../../imports/ui/CountdownTimer.jsx';
import formatFunc from '../../../imports/ui/countdown-format.js';
import BetLink from './BetLink.jsx';

/**
	List of images to present in feed
*/
export default class ImageList extends React.Component {
	render() {
		//Generate image components using Image class
		var imageComps = this.props.images.map((image, ind) => {
			//See if user already bet on this image
			var alreadyBet = image.usersBet.indexOf( Meteor.userId() ) !== -1;
			return (
				<Image key={image._id} picture={image} alreadyBet={alreadyBet}/>
			);
		});
		return (
			<div className="uk-grid">
				{imageComps}	
			</div>
		);
	}
}

/**
	Clickable image within the feed that leads to the bet placing page
*/
class Image extends React.Component {
	constructor(props) {
		super(props);
		var selectorImage = props.alreadyBet ? 'green-checkmark.png' : 'potogold.png';
		this.state = {selectorImage:selectorImage};
		if (props.alreadyBet) {
			console.log("Already bet");
		}
	}

	render() {
		return (
			<div className="uk-width-small-1-3 uk-width-1-2"> 
				<div className="uk-thumbnail">
					<figure className="uk-overlay">
                       	<img className="picture" src={this.props.picture.pictureData} />
                        <img className="pot" src={'images/'+this.state.selectorImage} />
                        
                        <div className="countdown-container">
                        	<span> Time Left: </span>
                        	<CountdownTimer initialTimeRemaining={5000} formatFunc={formatFunc} />
                        </div>
                       	<BetLink id={this.props.picture._id}/>
                    </figure>
				</div>			
			</div>
		);
	}
}