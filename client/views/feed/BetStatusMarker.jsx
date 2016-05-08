import React from 'react';

export default class BetStatusMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {betStatusImage:''};
    }

    render() {
    	var betStatusImage = ''
    	if(this.props.betStatus === 'bet-correct') {
        	betStatusImage = 'checkmark.svg';
        }
        if(this.props.betStatus === 'bet-incorrect') {
        	betStatusImage = 'letter-x.svg';
        }
    	var shouldShow = {
    		display: betStatusImage ? 'initial' : 'none'
    	}

        return (
        	<div id="bet-status-marker" style={shouldShow}>
        		<img className="bet-response" src={"images/"+betStatusImage} />
        	</div>);
    }
}
