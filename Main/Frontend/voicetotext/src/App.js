import React, { Component } from 'react';
import './App.css';
import Logo from './pchlogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, animateScroll as scroll } from "react-scroll";

import Secondpage from './Secondpage';
import Firstpage from './Firstpage';

class App extends Component {
  render() {
    return (
	<div className="App">    
			
			<Firstpage />
			<Secondpage />
				
	</div>
    );
  }
}

export default App;

