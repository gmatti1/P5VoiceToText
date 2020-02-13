import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Secondpage from './components/Secondpage';
import Firstpage from './components/Firstpage';

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
