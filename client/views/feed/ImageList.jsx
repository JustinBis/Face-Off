import React from 'react';
import CountdownTimer from '../../../imports/ui/CountdownTimer.jsx';
import {formatFunc, getTimeRemaining} from '../../../imports/ui/countdown-util.js';
import BetLink from './BetLink.jsx';
import reportError from '../../../imports/ui/report-error';
import CameraTile from './CameraTile.jsx';

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
				<Image key={image._id} picture={image} alreadyBet={alreadyBet} />
			);
		});
		return (
			<div className="uk-grid">
				<CameraTile />
				{imageComps}	
			</div>
		);
	}
}

/**
	Clickable image within the feed that leads to the bet placing page
*/
export class Image extends React.Component {
	constructor(props) {
		super(props);

		//Set state of pot of gold, checkmark, or x based on whether the user has bet or not
		this.state = {betStatusImage: 'images/potogold.png', inset:''};
		if (props.alreadyBet) {
			Meteor.call('bets.getGuessStatus', this.props.picture._id, (err, correct) => {
				if (err) {
					reportError(err);
				} 
				if (correct) {
					this.setState({betStatusImage: 'images/checkmark.svg',
								   inset: 'inset-green'
				});
				} else {
					this.setState({betStatusImage: 'images/letter-x.svg',
								   inset: 'inset-red'
				});
				}
			})
		} else {
			this.setState({betStatusImage: 'images/potogold.png', inset:''});
		}	
	}

	render() {
		var betLink;
		var inset = this.state.inset;
		var betStatusImage = this.state.betStatusImage;
		var imageClass = 'picture-visited';
		if(!this.props.alreadyBet) {
			betLink = <BetLink id={this.props.picture._id}/>
			inset = '';
			betStatusImage = 'images/potogold.png';
			imageClass = 'picture';
		} else {
			betLink = "";
		}

		return (
			<div className="grid-item"> 
				<div className="uk-thumbnail">
					<figure className={"uk-overlay "+inset}>
                       	<img className={imageClass} 
                       		 src={this.props.picture.pictureData} />
                        <img className="pot" src={betStatusImage} />
                        
                        <div className="countdown-container">
                        	<CountdownTimer initialTimeRemaining={getTimeRemaining(this.props.picture.createdAt)} 
                        					formatFunc={formatFunc} />
                        </div>
                       	{betLink}
                    </figure>
				</div>			
			</div>
		);
	}
}