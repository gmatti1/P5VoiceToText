import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './index.css';

  
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Category', field: 'category'},
                {headerName: 'Value', field: 'value'}
            ],
            rowData: [
                {category: 'Identification', value: 'Celica'},
                {category: 'Mechanism', value: 'Mondeo'},
                {category: 'Injuries', value: 'Boxter'},
                {category: 'Signs and Symptoms', value: 'Boxter'},
                {category: 'Treatment', value: 'Boxter'},
                {category: 'Allergies', value: 'Boxter'},
                {category: 'Medications', value: 'Boxter'},
                {category: 'Background', value: 'Boxter'},
                {category: 'Other Info', value: 'Boxter'}
            ]
        }
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '300px', width: '420px', paddingLeft: '500px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default Home;