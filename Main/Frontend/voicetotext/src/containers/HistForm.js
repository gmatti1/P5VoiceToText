import React from 'react';
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';

export const HistForm = ({ onSubmit, invalue, invalueother, handleChangeTeatarea }) => {
  return (
    <div class="histpopformcss">
    <form onSubmit={onSubmit}>
      <div className="histpopinputbox">
		<textarea
                className='histpopname'
                id='histTextarea'
                value={invalue}
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
                <td>vhvgvhgvhgvjhbjbjhbbbbhhhhhhhhhhhhhhhhhhhhhh</td>
              </tr>
              <tr>
                <td>Mechanism</td>
                <td>{invalueother.title}</td>
              </tr>
              <tr>
                <td>Injuries</td>
                <td></td>
              </tr>
              <tr>
                <td>Signs</td>
                <td colSpan='2'></td>
              </tr>
              <tr>
                <td>Treatment</td>
                <td></td>
              </tr>
              <tr>
                <td>Allergies</td>
                <td></td>
              </tr>
              <tr>
                <td>Medications</td>
                <td></td>
              </tr>
              <tr>
                <td>Background</td>
                <td></td>
              </tr>
              <tr>
                <td>Other Info</td>
                <td ></td>
              </tr>
            </tbody>
          </Table>
      </div>
	  </div>
    
    </div>
	
  );
};
export default HistForm;

