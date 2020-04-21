import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Secondpage from './components/Secondpage';
import Firstpage from './components/Firstpage';

import Thirdpage from './components/Thirdpage';
import ErrorHandler from  './components/ErrorHandler';

/**
 * 
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru]
 * @copyright [Copyright 2020, P5VoiceToText]
 * @credits  [Shashidhar Reddy Vanteru]
 * @email "svanter1@asu.edu"
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
