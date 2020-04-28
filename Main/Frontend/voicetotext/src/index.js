import React from 'react';
import ReactDOM from 'react-dom';
import './styles/demo.css';
import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';
import App from './App';

/**
 * This is the main file which calls the App component and runs the web app.
 *
 * @version 1.0
 * @author [Yuti Desai](https://github.com/yrdesai)
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

ReactDOM.render(<App />, document.getElementById('root'));

WebFont.load({
	google: {
		families: ['Josefin Sans:300,400,700', 'sans-serif']
	}
});
