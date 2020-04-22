import React, { Component } from './../../node_modules/react';
import HistPopUp from '../containers/HistPopUp';
import './../styles/index.css';
import './../styles/App.css';
 
 /**
 * This is the History component which displays previously uploaded files.
 * It makes a call to HistPopUp component.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @author [Surya Cherukuri] <scheruk5@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */
 
class History extends Component {
	constructor(props) 
	{
		super(props);

		this.state = {
			invalue:'hgjhgjhghjgjhgj',
			invalueother:{
				"userId": 1,
				"id": 1,
				"title": "delectus aut autem",
				"completed": false
			},
			files: [],
			filename: '',
			selected: null,
			search: ''
		};
  
		this.handleChangeselect = this.handleChangeselect.bind(this);
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.beforeunload);
		fetch('/api/files').then(response =>
			response.json()
			).then(files =>{
			//console.log(files);
			this.setState({
			files: files['files'] })}).catch((error) => {
            console.log(error);
        });
	}

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.beforeunload);
	}

	beforeunload = (e) => {
		e.preventDefault();
		e.returnValue = true;
	};

 
	onSubmit = event => {
		event.preventDefault(event);
		const data = this.state.invalueother;
		var myBody = {
			text: data
		};
		fetch('/api/convertedText/' + this.state.selected, {
		method: 'PUT',
		body: JSON.stringify(myBody),
		headers: {
			'Content-Type': 'application/json',
		},
		}).then((response) => this.updateCategorizedText());
	}
	
	
	updateCategorizedText() {
		fetch('/api/categorizedText/' + this.state.selected, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then((response) => response.json())
		.then((invalue) => {
        this.formatCategories(invalue);
		});
	}
	
	formatCategories(invalue){
		Object.keys(invalue).forEach(key => {
		var temp = ""
		for(var j=0; j < invalue[key].length; j++){
			temp += invalue[key][j];
			if(j!==invalue[key].length-1) temp+="\n"
		}
		invalue[key] = temp;
		})
		this.setState({ invalue: invalue });
	}
  
	handleChangeTeatarea = event => {
		event.preventDefault();
		this.setState({invalueother: event.target.value});
	  
	}
 
	handleChangeselect(event){
		console.log(event.target.value);
		this.setState({selected: event.target.value});
		this.Upload_History_file(event.target.value);
	}
	
	Upload_History_file(file1)
	{
		fetch('/api/convertedText/' + file1, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
		}).then(response => response.json())
		.then(title =>
		{

			this.setState({ invalueother:title['text'],
			stats:title['stats']
		});
		console.log(this.state.invalueother);
		});
      
		fetch('/api/categorizedText/' + file1, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
		})
		.then(response => response.json())
		.then(textCategorized => {
        console.log(textCategorized);
        this.setState({ invalue:textCategorized
		});
		console.log(this.state.invalue);	
		this.formatCategories(this.state.invalue)
		})
    }

	formatCategories(textCategorized)
	{
		Object.keys(textCategorized).forEach(key => {
		var temp = ""
		for(var j=0; j < textCategorized[key].length; j++){
			temp += textCategorized[key][j];
			if(j!=textCategorized[key].length-1) temp+="\n"
		}
		textCategorized[key] = temp;
		})
		this.setState({ invalue: textCategorized });
	}

	updateSearch(event) {
		this.setState({search: event.target.value.substr(0,20)});
	}	  

	render() 
	{
		let filteredFiles = this.state.files.filter(
			(file) => {
				return file.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}	
		);  
		const triggerText = "See saved result";  
    
		return (
			<div className='HistoryComponent'>
				<form>
					<div className='Historytext'>
						History
					</div>
					<div className='Historylist'>
						<select size='10' value={this.state.select} 
						onChange={this.handleChangeselect}  
						className='Historyselect' required>
						{filteredFiles.map(file => (
							<option value={file}>{file}</option>
						))}
						</select>
					</div>
					<div className='SearchHist'>
						<input className='Search' 
						type = "text" 
						placeholder="&#xf002; Search filename.."
						value={this.state.search}
						onChange={this.updateSearch.bind(this)}
						/>
					</div>
				</form>
				<HistPopUp 
				invalueother={this.state.invalueother} 
				invalue={this.state.invalue} 
				triggerText={triggerText} 
				onSubmit={this.onSubmit.bind(this)} 
				handleChangeTeatarea={this.handleChangeTeatarea.bind(this)}
				/>
			</div>
		);
	}
}

export default History;
