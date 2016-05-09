import React from 'react';

class CameraButton extends React.Component {
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
        		<button onClick={this.onClick} onTap={this.onClick}><i className="uk-icon-camera"></i></button>
        	</div>);
    }
}

export default CameraButton;