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
		title:'',
		isLoaded : false		 
		};
			
	this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {
	 event.preventDefault()	 
	 const data = this.state.title;
	 console.log("Edited text is : ",data);
  }
  
  handleChange = (event) => {
	event.preventDefault()
    this.setState({title: event.target.value});
  } 
  
  
  componentDidMount()
  {
	 fetch('https://jsonplaceholder.typicode.com/todos/1') 
	 .then(response => response.json())
	 .then(title => this.setState({isLoaded : true, title:title.title}))
  }

  render() {
	
		
	if (!this.state.isLoaded) {
		
	 return (
		
      
     <div className ="Textdata">      
	 		
            <label className ="LabelTextdata">
            Converted Text
            </label>
			
			<div className ="Textloader"> 
			
			<div class="loadingio-spinner-wedges-bdyr6gdft3b"><div class="ldio-fbwe939p7j">
            <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
            </div></div>

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
			value = {this.state.title}
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

