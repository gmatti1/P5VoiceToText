import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';

import ErrorHandler from './ErrorHandler';

/**
 * 
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru]
 * @copyright [Copyright 2020, P5VoiceToText]
 * @credits  [Shashidhar Reddy Vanteru]
 * @email "svanter1@asu.edu"
 * 
 */

function Secondpage() {
  return (
    <div className='Secondpage' id='main'>
      <ErrorHandler>
        <FileUpload />
      </ErrorHandler>
    </div>
  );
}

export default Secondpage;
