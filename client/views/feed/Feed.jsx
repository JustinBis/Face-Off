import React from 'react';
import { Pictures } from '../../../imports/api/pictures.js';
import { createContainer } from 'meteor/react-meteor-data';

window.Pictures = Pictures;
/**
	Root class for Image feed, responsible for creating an image list
	containing the url's for images that need to be displayed on a user's feed
*/
class Feed extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div id="feed">
				<ImageList images={this.props.images}/>
			</div>
		);
	}
}
Feed.propTypes = {
  images: React.PropTypes.array.isRequired,
};
export default createContainer(() => {
  return {
    images: Pictures.find({}).fetch(),
  };
}, Feed); 



/**
	List of images to present in feed
*/
class ImageList extends React.Component {
	render() {
		console.log(this.props.images)
		//Generate image components using Image class
		var imageComps = this.props.images.map((image, ind) => {
			return (
				<Image key={image._id} pictureData={image.pictureData}/>
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
                       	<img className="picture" src={this.props.pictureData} />
                        <img className="pot" src="http://www.pngall.com/wp-content/uploads/2016/03/Money-Free-Download-PNG-180x180.png" />
                       	<BetLink name={this.key}/>
                    </figure>
				</div>			
			</div>
		);
	}
}

class BetLink extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.name);
	}

	onClick() {
		FlowRouter.go('App.bet');
	}


	render() {
		return (
			<div>
				<a className="uk-position-cover" onClick={this.onClick}></a>
			</div>
		);
	}
}



