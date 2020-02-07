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
            ],
            columnDefs1: [
                {headerName: 'Converted Text', field: 'category'}
            ],
            rowData1: [
                {category: 'Test Data'}
            ]
        }
    }

    render() {
        return (
            <div>
                <div
                    className="ag-theme-balham"
                    style={{ height: '200px', width: '200px', margin: 'auto' }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs1}
                        rowData={this.state.rowData1}>
                    </AgGridReact>
                </div>

                <div
                    className="ag-theme-balham"
                    style={{ height: '300px', width: '400px', margin: 'auto' }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            
            </div>
        );
    }
}

export default Home;