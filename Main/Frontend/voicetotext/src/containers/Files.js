import React, { Component } from './../../node_modules/react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './../styles/index.css';
import './../styles/App.css';

class Files extends Component {
  constructor(props) {
    super(props); 
  }
   
  render() {	
  
	return (    
			
            <div className ="Historylist">	
				 <select size = "10" className ="Historyselect" required>{
					 this.props.files.map(file => 
					 <option value="file.value">{file.name}
					 </option>)
				}</select>
			</div>
		
    );
	
}
}

export default Files;
