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
  }

  render() {
	
		
	if (!this.props.isLoaded) {
		
	 return (null);
	}
	
	else {
		
    return (
     <div className ="Textdata"> 
	 		

            <label className ="LabelTextdata">
            Converted Text
            </label>			
			
			<form onSubmit={this.props.handleSubmit}>
			
			<div className="Textareasize">
						
            <textarea
            className="form-control"
            id="Textarea"			
			value = {this.props.title.title}
            onChange={this.props.handleChange}
    
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

