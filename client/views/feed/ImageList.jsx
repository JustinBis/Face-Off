import React from 'react';
import BetLink from './BetLink.jsx'

/**
	List of images to present in feed
*/
export default class ImageList extends React.Component {
	render() {
		console.log(this.props.images)
		//Generate image components using Image class
		var imageComps = this.props.images.map((image, ind) => {
			return (
				<Image key={image._id} picture={image}/>
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

	TODO remove and add moneybag
	** Commented Dollar sign div
	<figcaption className="uk-overlay-panel uk-overlay-icon-feed uk-icon-usd uk-overlay-background uk-overlay-fade">
                         </figcaption>
*/
class Image extends React.Component {
	render() {
		return (
			<div className="uk-width-small-1-3 uk-width-1-2"> 
				<div className="uk-thumbnail">
					<figure className="uk-overlay">
                       	<img className="picture" src={this.props.picture.pictureData} />
                        <img className="pot" src="http://www.pngall.com/wp-content/uploads/2016/03/Money-Free-Download-PNG-180x180.png" />
                       	<BetLink picture={this.props.picture}/>
                    </figure>
				</div>			
			</div>
		);
	}
}