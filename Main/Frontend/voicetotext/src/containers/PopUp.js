import React from 'react';
import './../styles/App.css';


class PopUp extends React.Component {
	constructor(props) {
		super(props);
    }
	
	render() {
	  
    return (
	
	
	<div class="popup">
		<p>Keyword:</p>
		<input></input>
		<select>
			<option>
			Select Category
			</option>
			<option>
			Identification
			</option>
			<option>
			Mechanism
			</option>
			<option>
			Injuries
			</option>
			<option>
			Signs
			</option>
			<option>
			Treatment
			</option>
			<option>
			Allergies
			</option>
			<option>
			Medications
			</option>
			<option>
			Background
			</option>
			<option>
			Other Info
			</option>
		</select>
		<a class="close" href="#">&times;</a>
	</div>
		
	)
}
}
export default PopUp;