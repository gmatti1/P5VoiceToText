import React, { Component } from './../../node_modules/react';
import { AgGridReact } from './../../node_modules/ag-grid-react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';

class CategorizedText extends Component {
  constructor(props) {
    super(props);
	
	this.state = {
		
	     Identification:'CelicaCelicaCelicaCelicaCelicaCelicaCelicaCelicaCelicaCelicaCelicaCelicaCelica' ,
         Mechanism: 'Mondeo' ,
         Injuries: 'Boxter' ,
         Symptoms: 'Boxter' ,
         Treatment: 'Boxter' ,
         Allergies: 'Boxter' ,
         Medications: 'Boxter' ,
         Background: 'Boxter' ,
         Other: 'Boxter'
		};

  }
  
  componentDidMount() {
    fetch('/categorizeText').then(response =>
      response.json().then(data => {
        this.setState({ textCategorized: data });
        console.log(this.state.textCategorized);
      })
    );
  }

  render() {
    return (
    
   <div className ='Categorydata'> 
   <label className ="LabelTextdata">
            Categorized Text
   </label>
   <div className="Tablesize">
  <Table striped bordered hover size="sm" responsive id ="TableText">
  <thead>
    <tr>     
      <th>Category</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody >
    <tr>
      <td>Identification</td>
      <td>{this.state.Identification}</td>
    </tr>
    <tr>
      <td>Mechanism</td>
      <td>{this.state.Mechanism}</td>
    </tr>
    <tr>
      <td>Injuries</td>
      <td>{this.state.Injuries}</td>
    </tr>
	<tr>
      <td>Symptoms</td>
      <td colSpan="2">{this.state.Symptoms}</td>
    </tr>
	<tr>
      <td>Treatment</td>
      <td>{this.state.Treatment}</td>
    </tr>
	<tr>
      <td>Allergies</td>
      <td>{this.state.Allergies}</td>
    </tr>
	<tr>
      <td>Medications</td>
      <td>{this.state.Medications}</td>
    </tr>
	<tr>
      <td>Background</td>
      <td>{this.state.Background}</td>
    </tr>
	<tr>
      <td>Other Info</td>
      <td>{this.state.Other}</td>
    </tr>
  </tbody>
</Table>
</div>
		</div>
    );
  }
}

export default CategorizedText;


