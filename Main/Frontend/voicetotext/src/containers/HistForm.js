import React from 'react';
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';
import nl2br from 'react-newline-to-break';

export const HistForm = ({ onSubmit, invalue, invalueother, handleChangeTeatarea }) => {
  return (
    <div class="histpopformcss">
    <form onSubmit={onSubmit}>
      <div className="histpopinputbox">
		<textarea
                className='histpopname'
                id='histTextarea'
                value={invalueother}
                required
				onChange={handleChangeTeatarea}
              />
			 
      </div>
		<button className="histpopbutton" type="submit">
          >>
        </button>
		</form>
      <div className="histpopcatbox">
	  <div className="histTablesize">
        <Table striped bordered hover size='sm' id='histTableText'>
            <thead>
              <tr>
                <th>Category</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identification</td>
                <td>{(invalue.identification)}</td>
              </tr>
              <tr>
                <td>Mechanism</td>
                <td>{(invalue.mechanism)}</td>
              </tr>
              <tr>
                <td>Injuries</td>
                <td> {(invalue.injury)}</td>
              </tr>
              <tr>
                <td>Signs</td>
                <td colSpan='2'> {(invalue.signs)} </td>
              </tr>
              <tr>
                <td>Treatment</td>
                <td> {(invalue.treatment)}</td>
              </tr>
              <tr>
                <td>Allergies</td>
                <td> {(invalue.allergy)}</td>
              </tr>
              <tr>
                <td>Medications</td>
                <td> {(invalue.medication)}</td>
              </tr>
              <tr>
                <td>Background</td>
                <td>{(invalue.background)}</td>
              </tr>
              <tr>
                <td>Other Info</td>
                <td >{(invalue.other)}</td>
              </tr>
            </tbody>
          </Table>
      </div>
	  </div>
    
    </div>
	
  );
};
export default HistForm;

