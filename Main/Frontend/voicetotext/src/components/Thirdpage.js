import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import History from '../containers/History';

/**
 * This is the Third page, which includes the History component.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

function Thirdpage() 
{
	return (
		<div className='Thirdpage' id='hist'>
			<History />
		</div>
	);
}

export default Thirdpage;
