import React, { Component } from './../../node_modules/react';
import { AgGridReact } from './../../node_modules/ag-grid-react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';

class ConvertedText extends Component {
  constructor(props) {
    super(props);
	
	this.state = {
		 item: '',
		 isLoaded : false
		 
		};
			

	
	this.handleChange = this.handleChange.bind(this);
	
	
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
  
  
  
  componentDidMount() {
   
    fetch('')
	.then(res => res.json())
	.then(json => {
		this.setState({
				isLoaded: true,
			    item: json,
			})
		}); 
  }

  render() {
	
	if (!this.state.isLoaded) {
	
	 return (
     <div className ="Textdata"> 			
            <label className ="LabelTextdata">
            Converted Text
            </label>
			
			<div className ="Textloader"> 
			
			<div class="loadingio-spinner-wedges-hgt0iyai7l"><div class="ldio-gqky8tv2eq9">
            <div><div><div></div></div><div><div></div></div><div><div></div></div>
			<div><div></div></div></div>
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
			value = {this.state.item}
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
