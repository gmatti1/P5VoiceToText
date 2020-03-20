import React, { Suspense } from 'react';
import './../styles/App.css';
import axios from 'axios';
import hist from './../assets/hist.png';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
//import ConvertedText from '../containers/ConvertedText';
import CategorizedText from '../containers/CategorizedText';
import { PropTypes } from 'react';
const ConvertedText = React.lazy(() => slowImport(import('../containers/ConvertedText'), 1000));


class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isFileUploaded: null,
      title:'',
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
    this.fetchcall();
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
  
  /* componentDidMount() {

	fetch(' http://localhost:5000/convertVoice ',{
  method: 'GET',

}).then((response2) => {

  response2.json().then(data => {this.setState({ tex: data.data });
    console.log(this.state.tex);
  });
 
    });  */

  
  
  fetchcall(){
	    this.setState({loading : true});
		fetch('https://jsonplaceholder.typicode.com/todos/1')
       .then(response => response.json())
	   .then(title => this.setState({title:title}))
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
            <button className="Historybutton" type='submit'>
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
                      <Suspense fallback = {<div><div className ="Textloader"> 
			
			<div class="loadingio-spinner-wedges-bdyr6gdft3b"><div class="ldio-fbwe939p7j">
            <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
            </div></div>

			</div> </div> }>
			
			
			 <ConvertedText loading = {this.state.loading} title = {this.state.title} handleSubmit = {this.handleSubmit.bind(this)} 
		 handleChange = {this.handleChange.bind(this)}/>
			
			</Suspense>
			
					 ) }
		</div>
		
		
	     <CategorizedText />
		 
      </div>
	 
    );
  }
}

export default FileUpload;
