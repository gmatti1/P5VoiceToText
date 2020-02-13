import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';
import Home  from '../containers/Home';

function Secondpage() {
  
    return (
      <div className="Secondpage" id="main"> 
	  <FileUpload />
		<Home />
	</div>
    );
  }

export default Secondpage;
