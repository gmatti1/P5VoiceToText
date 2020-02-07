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
                {headerName: 'Converted Text', field: 'category'}
            ],
            rowData: [
                {category: 'Test data'}
            ]
        }
    }

    render() {
        return (
            <div>
                <div
                    className="ag-theme-balham"
                    style={{ height: '300px', width: '420px', paddingLeft: '500px' }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>

                <div
                    className="ag-theme-balham"
                    style={{ height: '300px', width: '420px', paddingLeft: '500px' }}
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