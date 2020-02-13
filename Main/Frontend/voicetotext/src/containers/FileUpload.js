import React from './../../node_modules/react';

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
        <h1>Please upload the audio file</h1>
        <input
          type='file'
          ref={ref => {
            this.uploadInput = ref;
          }}
          name='voiceFile'
        />
        <button type='submit'>Upload</button>
      </form>
    );
  }
}

export default FileUpload;

// References https://gist.github.com/AshikNesin
//References: react website
