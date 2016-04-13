import React from 'react';
import { Meteor } from 'meteor/meteor';
import reportError from '../../../imports/ui/report-error';

// When they submit the photo and have a review screen, add random notes like "lookin' good!" or things like that

export default class TakePicture extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='camera'>
				<h1>HELLO!</h1>
			</div>
			)
	}
}