import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Secondpage from './components/Secondpage';
import Firstpage from './components/Firstpage';
import Thirdpage from './components/Thirdpage';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Firstpage />
        <Secondpage />
		<Thirdpage />
      </div>
    );
  }
}

export default App;
