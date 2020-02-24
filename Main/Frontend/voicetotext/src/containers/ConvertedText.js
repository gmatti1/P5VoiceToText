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
		value: 'Converted text will be displayed here'};
						
	this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {
	 event.preventDefault()	 
	 const data = this.state;
	 console.log("Edited text is",data);
  }
  
  handleChange = (event) => {
	event.preventDefault()
    this.setState({value: event.target.value});
  } 
  
  componentDidMount() {
    this.setState({value: 'Sigh view am high neat half to what. Sent late held than set why wife our. If an blessing building steepest. Agreement distrusts mrs six affection satisfied. Day blushes visitor end company old prevent chapter. Consider declared out expenses her concerns. No at indulgence conviction particular unsatiable boisterous discretion. Direct enough off others say eldest may exeter she. Possible all ignorant supplied get settling marriage recurred. Sigh view am high neat half to what. Sent late held than set why wife our. If an blessing building steepest. Agreement distrusts mrs six affection satisfied. Day blushes visitor end company old prevent chapter. Consider declared out expenses her concerns. No at indulgence conviction particular unsatiable boisterous discretion. Direct enough off others say eldest may exeter she. Possible all ignorant supplied get settling marriage recurred. '});
  }

  render() {
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
             value={this.state.value} onChange={this.handleChange}
            />
			</div>		
			
			<Button className="Save" type='submit'>Save</Button>	
			</form>	
		</div>
    );
  }
}

export default ConvertedText;
