import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';
import ErrorHandler from './ErrorHandler';
 
 /**
 * This is the Secondpage, which is the main page of the P5VoiceToText web application.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

function Secondpage() 
{
	return (
		<div className='Secondpage' id='main'>
			<ErrorHandler>
				<FileUpload />
			</ErrorHandler>
		</div>
	);
}

export default Secondpage;
