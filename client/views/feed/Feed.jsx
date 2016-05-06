import React from 'react';
import ImageList from './ImageList.jsx';
import CameraButton from './CameraButton.jsx';
import reportError from '../../../imports/ui/report-error';
import users from '../../../imports/api/users';

/**
	Root class for Image feed, responsible for creating an image list
	containing the images that need to be displayed on a user's feed
*/
export default class Feed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {};

		Meteor.subscribe('userData');

	}

	render() {
		return (
			<div id="feed">
				<ImageList images={this.props.images} />
				<div className="fixed-container">
					<CameraButton />
					
				</div>
			</div>
		);
	}
}

Feed.propTypes = {
  images: React.PropTypes.array.isRequired,
};







