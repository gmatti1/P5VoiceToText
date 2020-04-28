import React, { Component } from './../../node_modules/react';
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';
import nl2br from 'react-newline-to-break';

/**
 * This is the Categorized Text component. 
 * It displays the IMIST-AMBO categories and their values.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @author [Surya Cherukuri] <scheruk5@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

class CategorizedText extends Component {
	constructor(props) {
		super(props);
	}

	render() 
	{  
		if (!this.props.loading) 
		{
			return null;
		} 
		else 
		{
			console.log(this.props.textCategorized);
			return (
				<div className='Tablesize'>
					<Table striped bordered hover size='sm' responsive id='TableText'>
						<thead>
							<tr>
								<th>Category</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Identification</td>
								<td>{nl2br(this.props.textCategorized.identification)}</td>
							</tr>
							<tr>
								<td>Mechanism</td>
								<td>{nl2br(this.props.textCategorized.mechanism)}</td>
							</tr>
							<tr>
								<td>Injuries</td>
								<td>{nl2br(this.props.textCategorized.injury)}</td>
							</tr>
							<tr>
								<td>Signs</td>
								<td colSpan='2'>{nl2br(this.props.textCategorized.signs)}</td>
							</tr>
							<tr>
								<td>Treatment</td>
								<td>{nl2br(this.props.textCategorized.treatment)}</td>
							</tr>
							<tr>
								<td>Allergies</td>
								<td>{nl2br(this.props.textCategorized.allergy)}</td>
							</tr>
							<tr>
								<td>Medications</td>
								<td>{nl2br(this.props.textCategorized.medication)}</td>
							</tr>
							<tr>
								<td>Background</td>
								<td>{nl2br(this.props.textCategorized.background)}</td>
							</tr>
							<tr>
								<td>Other Info</td>
								<td >{nl2br(this.props.textCategorized.other)}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			);
		}
	}
}
export default CategorizedText;