import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './../navigation/Navbar';
import arrow from './../assets/arrow.png';
import { Link } from './../../node_modules/react-scroll';

class ErrorHandler extends React.Component {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true })
      
    
    }
  
    render() {
      if (this.state.hasError) {
        
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }

  export default ErrorHandler;