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

            <div className="grid-item"> 
                    <div className="uk-thumbnail">
                        <figure className="uk-overlay">
                            <button onClick={this.onClick}><img src="http://simpleicon.com/wp-content/uploads/camera.png" /></button>
                        </figure>
                    </div>          
               </div>


            );
    }

}

