import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
	    <Navbar expand="lg" variant="light" bg="light">
           <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Navbar>
        <header className="App-header">
           <h1 className="App-title">Voice-To-Text Application of Pediatric IMIST-AMBO Criteria</h1>
        </header>
      </div>
    );
  }
}

export default App;

