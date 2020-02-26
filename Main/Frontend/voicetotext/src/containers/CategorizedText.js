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
		
         textCategorized:{ "identification" : [],
                  "mechanism" : [],
                  "injury": [],
                  "signs": [],
                  "treatment": [],
                  "allergy": [],
                  "medication": [],
                  "background": [],
                  "other": [] } ,
				  
		isLoaded : false
		
		};

  }
  
  componentDidMount() {
    fetch('/categorizeText').then(response =>
      response.json().then(data => {
        this.setState({ isLoaded: true, textCategorized: data });
        console.log(this.state.textCategorized);      
		})
    );
  }

  render() {
    var identification_keywords = "";
    if(this.state.textCategorized.identification.length >= 1)
      identification_keywords = this.state.textCategorized.identification[0];
    for(var i = 1; i< this.state.textCategorized.identification.length; i++)
      identification_keywords+= ', ' + this.state.textCategorized.identification[i];

    var mechanism_keywords = "";
    if(this.state.textCategorized.mechanism.length >= 1)
      mechanism_keywords = this.state.textCategorized.mechanism[0];
    for(var i = 1; i< this.state.textCategorized.mechanism.length; i++)
      mechanism_keywords+= ', ' + this.state.textCategorized.mechanism[i];

    var injury_keywords = "";
    if(this.state.textCategorized.injury.length >= 1)
      injury_keywords = this.state.textCategorized.injury[0];
    for(var i = 1; i< this.state.textCategorized.injury.length; i++)
      injury_keywords+= ', ' + this.state.textCategorized.injury[i];

    var signs_keywords = "";
    if(this.state.textCategorized.signs.length >= 1)
      signs_keywords = this.state.textCategorized.signs[0];
    for(var i = 1; i< this.state.textCategorized.signs.length; i++)
      signs_keywords+= ', ' + this.state.textCategorized.signs[i];

    var treatment_keywords = "";
    if(this.state.textCategorized.treatment.length >= 1)
      treatment_keywords = this.state.textCategorized.treatment[0];
    for(var i = 1; i< this.state.textCategorized.treatment.length; i++)
      treatment_keywords+= ', ' + this.state.textCategorized.treatment[i];

    var allergy_keywords = "";
    if(this.state.textCategorized.allergy.length >= 1)
      allergy_keywords = this.state.textCategorized.allergy[0];
    for(var i = 1; i< this.state.textCategorized.allergy.length; i++)
      allergy_keywords+= ', ' + this.state.textCategorized.allergy[i];

    var medication_keywords = "";
    if(this.state.textCategorized.medication.length >= 1)
      medication_keywords = this.state.textCategorized.medication[0];
    for(var i = 1; i< this.state.textCategorized.medication.length; i++)
      medication_keywords+= ', ' + this.state.textCategorized.medication[i];

    var background_keywords = "";
    if(this.state.textCategorized.background.length >= 1)
      background_keywords = this.state.textCategorized.background[0];
    for(var i = 1; i< this.state.textCategorized.background.length; i++)
      background_keywords+= ', ' + this.state.textCategorized.background[i];

    var other_keywords = "";
    if(this.state.textCategorized.other.length >= 1)
      other_keywords = this.state.textCategorized.other[0];
    for(var i = 1; i< this.state.textCategorized.other.length; i++)
      other_keywords+= ', ' + this.state.textCategorized.other[i];    

	
	if (!this.state.isLoaded) {
		
	return (	
	
	<div className ='Categorydata'> 
   <label className ="LabelTextdata">
            Categorized Text
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
      <td>{identification_keywords}</td>
    </tr>
    <tr>
      <td>Mechanism</td>
      <td>{mechanism_keywords}</td>
    </tr>
    <tr>
      <td>Injuries</td>
      <td>{injury_keywords}</td>
    </tr>
	<tr>
      <td>Signs</td>
      <td colSpan="2">{signs_keywords}</td>
    </tr>
	<tr>
      <td>Treatment</td>
      <td>{treatment_keywords}</td>
    </tr>
	<tr>
      <td>Allergies</td>
      <td>{allergy_keywords}</td>
    </tr>
	<tr>
      <td>Medications</td>
      <td>{medication_keywords}</td>
    </tr>
	<tr>
      <td>Background</td>
      <td>{background_keywords}</td>
    </tr>
	<tr>
      <td>Other Info</td>
      <td>{other_keywords}</td>
    </tr>
  </tbody>
</Table>
</div>
		</div>
    );
  }
}
}
export default CategorizedText;


