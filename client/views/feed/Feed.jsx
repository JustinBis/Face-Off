import React from 'react';
import ImageList from './ImageList.jsx';
import CameraButton from './CameraButton.jsx';
import reportError from '../../../imports/ui/report-error';

/**
	Root class for Image feed, responsible for creating an image list
	containing the images that need to be displayed on a user's feed
*/
export default class Feed extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div id="feed">
				<ImageList userBets={this.props.userBets} images={this.props.images} />
				<div className="fixed-container">
					 <div className="score">
					 <CameraButton />
		               <span className='facebucks-text'>
		                    FACEBUCKS: {Meteor.user() && Meteor.user().score}
		               </span>
		            </div>
				</div>
				{"hey" +this.props.userBets}
			</div>
		);
	}
}

Feed.propTypes = {
  images: React.PropTypes.array.isRequired,
};







