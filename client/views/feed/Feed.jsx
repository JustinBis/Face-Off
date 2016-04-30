import React from 'react';
import ImageList from './ImageList.jsx';
import CameraButton from './CameraButton.jsx';

/**
	Root class for Image feed, responsible for creating an image list
	containing the url's for images that need to be displayed on a user's feed
*/
export default class Feed extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<div id="feed">
				<ImageList images={this.props.images} />
				<CameraButton />
			</div>
		);
	}
}

Feed.propTypes = {
  images: React.PropTypes.array.isRequired,
};







