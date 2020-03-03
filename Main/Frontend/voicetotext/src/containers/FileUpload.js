import React from 'react';
import './../styles/App.css';
import axios from 'axios';
import hist from './../assets/hist.png';
import { Link } from './../../node_modules/react-scroll';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileUploaded: null
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
}),
fetch(' http://localhost:5000/convertVoice ',{
  method: 'GET',
 
})
]).then(([response1,response2]) => {
  
  response2.json().then(data => {this.setState({ "data": data });
    console.log(this.state.data);
  });
       
    });
  }
  

 


  OnSubmittingForm(e) {
    e.preventDefault();
    this.Upload_file();
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
	  <Link
          activeClass='active'
          to='hist'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}>
            <button className="Historybutton" type='submit'><img src={hist} className='Histicon' alt='History' />
				<span className="tooltiptext">History : All the Uploaded files before</span>
			</button>
        </Link>
      </div>
    );
  }
}

export default FileUpload;
