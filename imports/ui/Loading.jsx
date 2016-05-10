import React from 'react';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
		return (
			<span> 
				<i className="uk-icon-spinner uk-icon-spin"></i>
			</span>);
    }
}


