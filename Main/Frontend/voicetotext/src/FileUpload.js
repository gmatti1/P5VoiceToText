import React from 'react'
import axios, { post } from 'axios';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.OnSubmittingForm = this.OnSubmittingForm.bind(this)
    this.onChangingForm = this.onChangingForm.bind(this)
    this.Upload_file = this.Upload_file.bind(this)
  }
  Upload_file(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }
  OnSubmittingForm(e){
    e.preventDefault() 
    this.Upload_file(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
 
 
  onChangingForm(e) {
    this.setState({file:e.target.files[0]})
  }

  render() {
    return (
      <form onSubmit={this.OnSubmittingForm}>
        <h1>Please upload the audio file</h1>
        <input type="file" onChangingForm={this.onChangingForm} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default FileUpload

// References https://gist.github.com/AshikNesin
//References: react website
