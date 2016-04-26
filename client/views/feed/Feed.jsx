import React from 'react';
import ImageList from './ImageList.jsx';
/**
	Root class for Image feed, responsible for creating an image list
	containing the url's for images that need to be displayed on a user's feed
*/
export default class Feed extends React.Component {
	constructor(props) {
		super(props)

	}


    // initialTimeRemaining: React.PropTypes.number.isRequired,
    // interval: React.PropTypes.number,
    // formatFunc: React.PropTypes.func,
    // tickCallback: React.PropTypes.func,
    // completeCallback: React.PropTypes.func

	render() {
		return (
			<div id="feed">
				<ImageList images={this.props.images} />
			</div>
		);
	}
}

Feed.propTypes = {
  images: React.PropTypes.array.isRequired,
};







