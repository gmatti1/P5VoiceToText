import React from 'react';
import ReactDOM from 'react-dom';
import './styles/demo.css';
import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

WebFont.load({
  google: {
    families: ['Josefin Sans:300,400,700', 'sans-serif']
  }
});
