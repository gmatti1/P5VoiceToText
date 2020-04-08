import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';

import ErrorHandler from  './ErrorHandler';

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
