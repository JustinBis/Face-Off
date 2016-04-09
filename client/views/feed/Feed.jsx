import React from 'react';


class Image extends React.Component {
	render() {
		return (
			<div className="uk-width-small-1-3 uk-width-1-2"> 
				<div className="uk-thumbnail">
					<figure className="uk-overlay">
                        <figcaption className="uk-overlay-panel uk-overlay-icon-feed uk-icon-usd uk-overlay-background uk-overlay-fade">
                        </figcaption>
                        <a className="uk-position-cover" href="/bet"></a>
                    </figure>
				</div>			
			</div>
		);
	}
}

class ImageList extends React.Component {
	render() {
		return (
			<div className="uk-grid">
				<Image />
				<Image />
				<Image />
				<Image />
				<Image />
				<Image />	
			</div>
		);
	}
}

export default class Feed extends React.Component {
	render() {
		return (
			<div id="feed">
				<ImageList/>
			</div>
		);
	}
}

