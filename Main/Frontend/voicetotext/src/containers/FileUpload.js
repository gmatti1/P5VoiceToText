import React from 'react';
import './../styles/App.css';
import axios from 'axios';
import hist from './../assets/hist.png';
import { Link } from './../../node_modules/react-scroll';
import ConvertedText from '../containers/ConvertedText';
import CategorizedText from '../containers/CategorizedText';
import { PropTypes } from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isFileUploaded: null,
      title:'',
	  isLoaded : false	
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
    this.Upload_file();
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
  
  
  componentDidMount()
  {
	 fetch('https://jsonplaceholder.typicode.com/todos/1') 
	 .then(response => response.json())
	 .then(title => this.setState({isLoaded : true, title:title}))
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
        />
        <button className="Buttonformat" type='submit' >Upload</button>		 		
      </form>	  
	  <div className="ORtext">or</div>
	  <Link
          activeClass='active'
          to='hist'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}>
            <button className="Historybutton" type='submit'>
			    Select From History
				<span className="tooltiptext">History : All the Uploaded files before</span>
			</button>
        </Link>
		
		 <ConvertedText isLoaded = {this.state.isLoaded} title = {this.state.title} handleSubmit = {this.handleSubmit.bind(this)} 
		 handleChange = {this.handleChange.bind(this)}/>
	     <CategorizedText />
		 
      </div>
    );
  }
}

export default FileUpload;
