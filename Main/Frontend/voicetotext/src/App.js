import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          SER517 Capstone Project - Team5 - Voice-to-text application of Pediatric IMIST-AMBO criteria
        </p>
      </div>
    );
  }
}

export default App;
