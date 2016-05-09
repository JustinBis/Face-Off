import React from 'react';

export default class BetStatusMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {betStatusImage:''};
    }

    render() {
    	var betStatusImage = 'potogold.png'
    	if(this.props.betStatus === 'correct-bet') {
        	betStatusImage = 'checkmark.svg';
        }
        if(this.props.betStatus === 'incorrect-bet') {
        	betStatusImage = 'letter-x.svg';
        }
        var potClass = this.props.betStatus === 'not-bet' ? 'pot': '';
    	var shouldShow = {
    		display: betStatusImage ? 'initial' : 'none'
    	}

        return (
        	<div id="bet-status-marker" style={shouldShow}>
        		<img className={"bet-marker "+potClass} src={"images/"+betStatusImage} />
        	</div>);
    }
}
