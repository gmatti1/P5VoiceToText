import React, { Component } from 'react';
import './App.css';
import Logo from './pchlogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Apppage2 from './Apppage2';

class App extends Component {
  render() {
    return (
	<div className="App">
	<Router>
			<Route path={"apppage2"} component={Apppage2} />
	
       
			<Navbar /> 
			<div className="App-bg" />
			<header className="App-header">
				<h1 className="App-title">
					<Link to="apppage2">Voice-To-Text Application of Pediatric IMIST-AMBO Criteria
					</Link>
				</h1>
			</header>
			
		
      </Router>		
	</div>
    );
  }
}

export default App;

