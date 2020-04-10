import React from 'react';
import './../styles/App.css';

class Form extends React.Component{
	constructor(props) {
	super(props);
		
	this.state = {
      
		inputValue: '',
		selectedValue: 0
      
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
		var myBody = {
			keyword: inputValue,
			category: selectedValue
		};
	  
		fetch('/api/imistambo_glossory' , {
			method: 'POST',
			body: JSON.stringify(myBody),
			headers: {
			  'Content-Type': 'application/json',
			},
		  })
		.then((response) => response.json())
		.then((title) => {
			alert(title['message']);
		});
		
		this.setState({inputValue: ''});
		this.setState({selectedValue: 0});	 
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
	<form onSubmit={this.handleSubmit}>
		<div className="form-group">
			<select className="form-control" id="selectPopUp" value={this.state.selectedValue}  onChange={this.handleChangeSelect} required>
				<option value='0'>
				Select IMIST-AMBO Category
				</option>
				<option>
				identification
				</option>
				<option>
				mechanism
				</option>
				<option>
				injury
				</option>
				<option>
				signs
				</option>
				<option>
				treatment
				</option>
				<option>
				allergy
				</option>
				<option>
				medication
				</option>
				<option>
				background
				</option>
				<option>
				other
				</option>
			</select>
		</div>
		<div className="form-group">      
			<input className="form-control" id="inputPopUp" placeholder="Enter keyword for selected category" value={this.state.inputValue}
			onChange={this.handleChange} required>
			</input>
		</div>
		<div className="form-group">
			<button className="form-control btn btn-success" id="buttonPopUp" type="submit">
				Submit
			</button>
		</div>
    </form>
);
}
}

export default Form;