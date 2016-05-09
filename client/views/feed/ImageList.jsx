import React from 'react';
import CountdownTimer from '../../../imports/ui/CountdownTimer.jsx';
import {formatFunc, getTimeRemaining} from '../../../imports/ui/countdown-util.js';
import BetLink from './BetLink.jsx';
import BetStatusMarker from './BetStatusMarker.jsx';
import reportError from '../../../imports/ui/report-error';
import CameraTile from './CameraTile.jsx';

/**
	List of images to present in feed
*/
export default class ImageList extends React.Component {
	render() {
		console.log(this.props.userBets)
		//Generate image components using Image class
		var imageComps = this.props.images.map((image, ind) => {
			//See if user already bet on this image
			var betStatus = 'not-bet';
			var alreadyBet = false;
			this.props.userBets.forEach((bet) => {
				if(bet.pictureId === image._id) {
					alreadyBet = true;
					betStatus = bet.emojiActual === bet.emojiGuessed ? 'correct-bet' : 'incorrect-bet';
				}
			});
			return (
				<Image key={image._id} picture={image} alreadyBet={alreadyBet} betStatus={betStatus} />
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
	}

	render() {
		var betLink;
		//If a given image has been visited, stop animation / eliminate blur
		var visitedClass = this.props.alreadyBet ? '-visited' : '';
		var betLink = !this.props.alreadyBet ? <BetLink id={this.props.picture._id} /> : '';
		return (
			<div className="grid-item uk-container-center"> 
				<div className={"uk-thumbnail thumbnail"+visitedClass}>
					<figure className={"uk-overlay inset-"+this.props.betStatus}>
                       	<img className={"picture"+visitedClass} 
                       		 src={this.props.picture.pictureData} />
                       	<BetStatusMarker betStatus={this.props.betStatus}/>
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

















