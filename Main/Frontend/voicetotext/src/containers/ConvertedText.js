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
		value: 'Yet remarkably appearance get him his projection. Diverted endeavor bed peculiar men the not desirous. Acuteness abilities ask can offending furnished fulfilled sex. Warrant fifteen exposed ye at mistake. Blush since so in noisy still built up an again. As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mr it he mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of norland arrived. '};
		
				
	this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  } 
  
  componentDidMount() {
    fetch('/convertVoice').then(response =>
      response.json().then(data => {
        this.setState({ textConverted: data });
        console.log(this.state.textConverted);
      })
    );
  }

  render() {
    return (
     <div className ='Textdata'> 
    	<Form>
			<Form.Group controlId="exampleForm.ControlTextarea1">
			<Form.Label>Example textarea</Form.Label>
			<Form.Control as="textarea" rows="10" readOnly value={this.state.value} onChange={this.handleChange} />
			</Form.Group>
        </Form>
		</div>
    );
  }
}

export default ConvertedText;
