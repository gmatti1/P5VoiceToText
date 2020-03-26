import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './../navigation/Navbar';
import arrow from './../assets/arrow.png';
import { Link } from './../../node_modules/react-scroll';

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