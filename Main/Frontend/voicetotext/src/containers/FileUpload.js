import React, { Suspense } from 'react';
import './../styles/App.css';
import axios from 'axios';
import hist from './../assets/hist.png';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
//import ConvertedText from '../containers/ConvertedText';
//import CategorizedText from '../containers/CategorizedText';
import Thirdpage from '../components/Thirdpage';
import History from '../containers/History';
import Loader from '../containers/Loader';
import { PropTypes } from 'react';
const ConvertedText = React.lazy(() => slowImport(import('../containers/ConvertedText'), 1000));
const CategorizedText = React.lazy(() => slowImport(import('../containers/CategorizedText'), 1000));

class FileUpload extends React.Component {
	constructor(props) {
		super(props);
    
		this.state = {
			isFileUploaded: null,
			title:'',
			textCategorized:'',
			/*textCategorized:{ "identification" : [],
							  "mechanism" : [],
							  "injury": [],
							  "signs": [],
							  "treatment": [],
							  "allergy": [],
							  "medication": [],
							  "background": [],
							  "other": [] } ,  */
			loading : false	
		};

		this.OnSubmittingForm = this.OnSubmittingForm.bind(this);
		this.Upload_file = this.Upload_file.bind(this);
  
	}

    Upload_file(file) {
		const formData = new FormData();
		formData.append('file', this.uploadInput.files[0]);
		Promise.all([fetch('/uploadVoiceFile', {
		method: 'POST',
		body: formData
		})
		])
		this.props.func();
	}
  
	OnSubmittingForm(e) {
		e.preventDefault();
		//this.Upload_file();
		this.fetchcalltext();
		this.fecthcallcategory();
	}
  
	handleSubmit = (event) => {
		event.preventDefault()	 
		const data = this.state.title;
		console.log("Edited text is : ",data);
	}
  
	handleChange = (event) => {
		event.preventDefault()
		this.setState({title: event.target.value});
	} 

  
	fetchcalltext(){
	    this.setState({loading : true});
		fetch('https://jsonplaceholder.typicode.com/todos/1')
       .then(response => response.json())
	   .then(title => this.setState({title:title}))
	   
	    /* componentDidMount() {

		fetch(' http://localhost:5000/convertVoice ',{
		method: 'GET',

		}).then((response2) => {

		response2.json().then(data => {this.setState({ tex: data.data });
		console.log(this.state.tex);
		});
		});  */
	}	  
  
  
	fecthcallcategory(){
		this.setState({loading : true});
		fetch('https://jsonplaceholder.typicode.com/todos/1')
       .then(response => response.json())
	   .then(textCategorized => this.setState({textCategorized:textCategorized}))		
		
		/*  componentDidMount() {
		let v = {
		"filename":"test_shefali1.mp3"
		}
		fetch('/savedCategorizeText',{
        method: 'POST',
        body: JSON.stringify(v),
        headers: { 'Content-type': 'application/json' }
		})
		.then(response =>
        response.json().then(data => {
        this.setState({ isLoaded: true, textCategorized: data });
        console.log(this.state.textCategorized);      
		})
		);
		}   */ 
	}
	
	
 
	render() {
	  
    return (
	
		<div>
			<form onSubmit={this.OnSubmittingForm}>
				<h1 className="Uploadheader">Please upload the audio file</h1>
				<input className ="Input"
				type='file'
				ref={ref => {
				this.uploadInput = ref;
				}}
				name='voiceFile'
				required/>
				<button className="Buttonformat" type='submit' >Upload  
				</button>		 		
			</form>	  
			<div className="ORtext">or</div>
			<Link
				activeClass='active'
				to='hist'
				spy={true}
				smooth={true}
				offset={0}
				duration={500}>
				<button className="Historybutton" type='submit' onclick = {this.fetchlist}>
			    Select From History
					<span className="tooltiptext">History : All the Uploaded files before</span>
				</button>
			</Link>
		
			<div className ="Textdata"> 
	 		

				<label className ="LabelTextdata">
					Converted Text
				</label>			
			
			
				{!this.state.loading ? (
                    <div></div>
					) : (
                    <Suspense fallback = {<Loader />}>
						
					<ConvertedText loading = {this.state.loading} title = {this.state.title} handleSubmit = {this.handleSubmit.bind(this)} 
					handleChange = {this.handleChange.bind(this)}/>
			
					</Suspense>
					) 
				}
			</div>
		
			<div className ='Categorydata'> 
				<label className ="LabelTextdata">
					Categorized Text
				</label>	

				{!this.state.loading ? (
                    <div></div>
					) : (
                    <Suspense fallback = {<Loader />}>
						
					<CategorizedText loading = {this.state.loading} textCategorized = {this.state.textCategorized}/>
			
					</Suspense>
					) 
				}
			</div>
		</div> 
    );
  }
}

export default FileUpload;
