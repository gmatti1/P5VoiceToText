import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';
import Home from '../containers/Home';
import ConvertedAndCategorizedText from './../containers/ConvertedAndCategorizedText';

function Secondpage() {
  return (
    <div className='Secondpage' id='main'>
      <FileUpload />
      <ConvertedAndCategorizedText />
    </div>
  );
}

export default Secondpage;
