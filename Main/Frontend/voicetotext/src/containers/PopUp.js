import React from 'react';
import './../styles/App.css';


class PopUp extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
      
     inputValue: '',
	 selectedValue: null
      
    };

    
    this.handleChange = 
	this.handleChange.bind(this);
	this.handleChangeSelect = 
	this.handleChangeSelect.bind(this);
    }

  
    handleSubmit = (event) => {
	 event.preventDefault()	 
	 const inputValue = this.state.inputValue;
	 const selectedValue = this.state.selectedValue;
	 console.log("inputValue:",inputValue);
	 console.log("selectedValue:",selectedValue);
	 alert('Your changes have been saved');
	 
    }

    handleChange = (event) => {
	event.preventDefault()	
		 this.setState({inputValue: event.target.value});
	
    } 	
 
    handleChangeSelect = (event) => {
    event.preventDefault()   
		 this.setState({selectedValue: event.target.value});

    }
	
	render() {
	  
    return (
	
	
	<div className="popup">
	<form className="PopUpForm" onSubmit={this.handleSubmit}>
	<div className="InputBorder">
		<div className="PopUpInput">
		<input className="Inputwidth" placeholder="Enter keyword for selected category" value={this.state.inputValue}
		onChange={this.handleChange} required>
		</input></div>
			</div>
		<select className="PopUpSelect" value={this.state.selectedValue}  onChange={this.handleChangeSelect} required>
			<option>
			Select IMIST-AMBO Category
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
		<button className="PopUpButton" type='submit' href="#main" >Submit</button>
		<a className="close" href="#main">&times;</a>
		</form>
	</div>
		
	)
}
}
export default PopUp;