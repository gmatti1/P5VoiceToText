import React, { Component } from './../../node_modules/react';
import { AgGridReact } from './../../node_modules/ag-grid-react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';

class CategorizedText extends Component {
  constructor(props) {
    super(props);
	
	this.state = {
      columnDefs: [
        { headerName: 'Category', field: 'category' },
        { headerName: 'Value', field: 'value' }
      ],
      rowData: [
        { category: 'Identification', value: 'Celica' },
        { category: 'Mechanism', value: 'Mondeo' },
        { category: 'Injuries', value: 'Boxter' },
        { category: 'Signs and Symptoms', value: 'Boxter' },
        { category: 'Treatment', value: 'Boxter' },
        { category: 'Allergies', value: 'Boxter' },
        { category: 'Medications', value: 'Boxter' },
        { category: 'Background', value: 'Boxter' },
        { category: 'Other Info', value: 'Boxter' }
      ],
      columnDefs1: [{ headerName: 'Converted Text', field: 'category' }],
      rowData1: [{ category: 'Test Data' }]
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
        <div className='ag-theme-balham' style={{ height: '400px', width: '500px' }}>
		<AgGridReact className="Categorydata"
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
			style={{ height: '400px', width: '500px' }}
		
          ></AgGridReact>
        </div>
		</div>
    );
  }
}

export default CategorizedText;


