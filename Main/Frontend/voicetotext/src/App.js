import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Secondpage from './components/Secondpage';
import Firstpage from './components/Firstpage';
import Thirdpage from './components/Thirdpage';
import ErrorHandler from  './components/ErrorHandler';

/**
 * This is the App component. 
 * It is the component which calls Firstpage, Secondpage and Thirdpage components.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

class App extends Component {
	render() {
		return (
			<div className='App'>
				<ErrorHandler>
					<Firstpage />
				</ErrorHandler>
				<ErrorHandler>
					<Secondpage />
				</ErrorHandler>	
				<ErrorHandler>
					<Thirdpage />
				</ErrorHandler>
			</div>
		);
	}
}

export default App;
