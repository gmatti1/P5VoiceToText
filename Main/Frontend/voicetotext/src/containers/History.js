import React, { Component } from './../../node_modules/react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './../styles/index.css';
import './../styles/App.css';

class History extends Component {
 
  state ={
	 files:[]
  }
  
  componentDidMount()
  {
	 fetch('https://jsonplaceholder.typicode.com/users') 
	 .then(response => response.json())
	 .then(files => this.setState({files:files}))
  }
 
  OnSubmitForm(e) {
    e.preventDefault();    
  }
 
  render() {		
	return (    
	    <div className ="HistoryComponent"> 
		<form onSubmit={this.OnSubmitForm}>
            <div className="Historytext">History
			
			<button className="HistoryUploadbutton" type='submit' >Upload selected file</button>				
			</div> 
			
            <div className ="Historylist">	
				 <select className ="Historyselect" >{
					 this.state.files.map(file => 
					 <option value="file.value">{file.name}
					 </option>)
				}</select>
			</div>
		</form>
        </div>	
    );
}
}

export default History;
