import React from 'react';

export default class CameraTile extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        FlowRouter.go("App.camera");
    }

    render() {
        return (

            <div id="camera-tile" className="grid-item uk-container-center"> 
                    <div className="uk-thumbnail">
                        <figure className="uk-overlay">
                            <button onClick={this.onClick}><img src="images/camera.png" /></button>
                        </figure>
                    </div>          
               </div>


            );
    }

}
