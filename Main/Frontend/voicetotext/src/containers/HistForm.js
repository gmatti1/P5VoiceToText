import React from 'react';
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';
import './../styles/demo.css';
import nl2br from 'react-newline-to-break';


export const HistForm = ({ 
	onSubmit, 
	invalue, 
	invalueother, 
	handleChangeTeatarea 
	}) => {
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
					Save>>
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
								<td>{nl2br(invalue.identification)}</td>
							</tr>
							<tr>
								<td>Mechanism</td>
								<td>{nl2br(invalue.mechanism)}</td>
							</tr>
							<tr>
								<td>Injuries</td>
								<td> {nl2br(invalue.injury)}</td>
							</tr>
							<tr>
								<td>Signs</td>
								<td colSpan='2'> {nl2br(invalue.signs)} </td>
							</tr>
							<tr>
								<td>Treatment</td>
								<td> {nl2br(invalue.treatment)}</td>
							</tr>
							<tr>
								<td>Allergies</td>
								<td> {nl2br(invalue.allergy)}</td>
							</tr>
							<tr>
								<td>Medications</td>
								<td> {nl2br(invalue.medication)}</td>
							</tr>
							<tr>
								<td>Background</td>
								<td>{nl2br(invalue.background)}</td>
							</tr>
							<tr>
								<td>Other Info</td>
								<td>{nl2br(invalue.other)}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};
export default HistForm;

