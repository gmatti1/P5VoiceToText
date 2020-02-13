import React from 'react';
import './../styles/App.css';

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

    fetch('/uploadVoiceFile', {
      method: 'POST',
      body: formData
    }).then(response => {
      response.json().then(data => {
        this.setState({ isFileUploaded: data });
        console.log(this.state.isFileUploaded);
      });
    });
  }

  OnSubmittingForm(e) {
    e.preventDefault();
    this.Upload_file();
  }

  render() {
    return (
      <form onSubmit={this.OnSubmittingForm}>
        <h1 className="Uploadheader">Please upload the audio file here</h1>
        <input className ="Input"
          type='file'
          ref={ref => {
            this.uploadInput = ref;
          }}
          name='voiceFile'
        />
        <button className="Buttonformat" type='submit'>Upload</button>
      </form>
      <div className='chooseFileUpload'>
        <form onSubmit={this.OnSubmittingForm}>
          <h2>Please upload the audio file</h2>

          <input
            type='file'
            ref={ref => {
              this.uploadInput = ref;
            }}
            name='voiceFile'
          />
          <button type='submit'>Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
