import React from 'react';



/**
 * Button placed in fixed position on the feed that takes a user back to the take-picture page
 */
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
            <div className="score">
                
        	   <div id="camera-button">
        		  Camera: <button onClick={this.onClick}><i className="uk-icon-camera uk-icon-medium"></i></button>
        	   </div>
               <span>
                    Facebucks: {Meteor.user() && Meteor.user().score}
               </span>
            </div>);
    }
}

export default CameraButton;
