import React from 'react';


/**
	Root class for Image feed, responsible for creating an image list
	containing the url's for images that need to be displayed on a user's feed
*/
export default class Feed extends React.Component {
	constructor(props) {
		super(props)
		var image = {url:"images/selfie.jpg", name:'selfie'};
		var images = [
			image,
			image,
			image,
			image,
			image,
			image
		];
		this.state = {images:images}
		}


	render() {
		return (
			<div id="feed">
				<ImageList images={this.state.images}/>
			</div>
		);
	}
}

/**
	List of images to present in feed
*/
class ImageList extends React.Component {
	render() {
		//TODO add unique key identifier for each element
		var imageComps = this.props.images.map((image, ind) => {
			return (
				<Image key={ind} url={image.url} name={image.name}/>
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
	render() {
		return (
			<div className="uk-width-small-1-3 uk-width-1-2"> 
				<div className="uk-thumbnail">
					<figure className="uk-overlay">
                       	<img src={this.props.url} />
                        <figcaption className="uk-overlay-panel uk-overlay-icon-feed uk-icon-usd uk-overlay-background uk-overlay-fade">
                        </figcaption>
                       	<BetLink name={this.props.name}/>
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