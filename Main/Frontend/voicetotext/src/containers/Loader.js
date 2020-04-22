import React from 'react';
import './../styles/App.css';

/**
 * 
 * This is the Loader component. 
 * It is the loading indicator for API calls.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

class Loader extends React.Component {
	constructor(props) {
		super(props);
    }
	
	render() 
	{	  
		return (	
			<div>
				<div className ="Textloader"> 
					<div class="loadingio-spinner-wedges-bdyr6gdft3b"><div class="ldio-fbwe939p7j">
					<div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
					</div></div>
				</div>
			</div>		
		)
	}
}
export default Loader;