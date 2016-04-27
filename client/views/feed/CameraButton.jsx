import React from 'react';


class CameraButton extends React.Component {
	//TODO test onClick
	//TODO fix box shadow on button
    constructor(props) {
        super(props);
        this.displayName = 'CameraButton';
    }

    onClick() {
    	FlowRouter.go("App.camera");
    }


    render() {
        return (
        	<div id="camera-button">
        		<button onClick={this.onClick}><i className="uk-icon-camera"></i></button>
        	</div>);
    }
}

export default CameraButton;
