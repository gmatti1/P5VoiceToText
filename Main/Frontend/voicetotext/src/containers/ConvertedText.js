import React, { Component } from './../../node_modules/react';
import { AgGridReact } from './../../node_modules/ag-grid-react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';
import FileUpload from './FileUpload';
import { PropTypes } from 'react';

class ConvertedText extends Component {
  constructor(props) {
    super(props);
	
	this.state = {
		tex:"",
		 item: '',
		 isLoaded : false
		 
		};
			

	
	this.handleChange = this.handleChange.bind(this);
	this.convertText = this.convertText.bind(this);
	
  }

  handleSubmit = (event) => {
	 event.preventDefault()	 
	 const data = this.state.item;
	 console.log("Edited text is : ",data);
  }
  
  handleChange = (event) => {
	event.preventDefault()
    this.setState({value: event.target.item});
  } 
  
  
  
   convertText() {

	fetch(' http://localhost:5000/convertVoice ',{
  method: 'GET',
 
}).then((response2) => {
  
  response2.json().then(data => {this.setState({ tex: data.data });
    console.log(this.state.tex);
  });
       
    });
   
    
  }

  render() {
	
		
	if (!this.state.isLoaded) {
		
	 return (
		
     <div className ="Textdata"> 
	 		{this.convertText()}
            <label className ="LabelTextdata">
            Converted Text
            </label>
			
			<div className ="Textloader"> 
			
			<div>
			{this.state.tex}
			</div>

			</div> 

		</div>
    );
	}
	
	else {
		
    return (
     <div className ="Textdata"> 
	 		

            <label className ="LabelTextdata">
            Converted Text
            </label>			
			
			<form onSubmit={this.handleSubmit}>
			
			<div className="Textareasize">
						
            <textarea
            className="form-control"
            id="Textarea"			
			value = {this.state.tex}
      onChange={this.handleChange}
    
            /> 
			
			</div>		
			
			<Button className="Save" type='submit'>Save</Button>	
			</form>	
	
		</div>
    );
	
	}
  }
}

export default ConvertedText;

