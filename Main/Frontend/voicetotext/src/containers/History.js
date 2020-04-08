import React, { Component } from './../../node_modules/react';
import './../styles/index.css';
import './../styles/App.css';
//import Select, { components } from 'react-select';
//import Files from '../containers/Files';
//import FileUpload from './FileUpload';
class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      selected: null,
	  search: ''
    };
    this.OnSubmitForm = this.OnSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/files')
      .then(response =>
        
        response.json()).then(files => this.setState({ files: files['files'] }))
  }
  
  
  OnSubmitForm(e) {
    e.preventDefault();
  
    console.log(this.state.selected);
    
	alert('This functionality is under construction. Sorry for the inconvenience');
  }
 
  handleChange(event){
    console.log(event.target.value);
    this.setState({selected: event.target.value});
  }
  
  updateSearch(event) {
	  this.setState({search: event.target.value.substr(0,20)});
  }	  

  render() {
	let filteredFiles = this.state.files.filter(
	  (file) => {
		  return file.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
	  }	
	);  
	  
    return (
      <div className='HistoryComponent'>
        <form onSubmit={this.OnSubmitForm}>
          <div className='Historytext'>
            History
            <button className='HistoryUploadbutton' type='submit'>
              Upload selected file
            </button>
          </div>

          <div className='Historylist'>
            <select size='10' value={this.state.select} onChange={this.handleChange}  className='Historyselect' required>
              {filteredFiles.map(file => (
                <option value={file}>{file}</option>
              ))}
            </select>
          </div>
		  <div className='SearchHist'>
		  <input className='Search' type = "text" placeholder="&#xf002; Search filename.."
				value={this.state.search}
				onChange={this.updateSearch.bind(this)}
		  />
		  </div>
        </form>
      </div>
    );
  }
}

export default History;
