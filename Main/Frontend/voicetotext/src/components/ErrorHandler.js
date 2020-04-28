import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 *
 * This is an error-handler for the web page.
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText]
 * 
 */

class ErrorHandler extends React.Component {
    constructor(props) {
		super(props)
		this.state = { errorOccurred: false }
    }
  
    componentDidCatch(error, info) {
		this.setState({ errorOccurred: true })
    }
  
    render() {
      return this.state.errorOccurred ? <h1>Something went wrong!</h1> : this.props.children
    }
}

export default ErrorHandler;