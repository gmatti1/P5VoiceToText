import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Secondpage from './Secondpage';
import Firstpage from './Firstpage';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Firstpage />
        <Secondpage />
      </div>
    );
  }
}

export default App;
