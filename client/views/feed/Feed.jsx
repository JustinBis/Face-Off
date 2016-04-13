import React from 'react';
import { Pictures } from '../../../imports/api/pictures.js';
import { createContainer } from 'meteor/react-meteor-data';
import ImageList from './ImageList.jsx';

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
    images: Pictures.find({}, {sort:{createdAt:-1}}).fetch(),
  };
}, Feed); 





