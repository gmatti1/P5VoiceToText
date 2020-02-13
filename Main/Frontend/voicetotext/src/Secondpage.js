import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './FileUpload';
import Home  from './Home';

function Secondpage() {
  
    return (
      <div className="Secondpage" id="main"> 
	  <FileUpload />
		<Home />
	</div>
    );
  }

export default Secondpage;
