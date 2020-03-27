import React, { Component } from './../../node_modules/react';
import './../styles/index.css';
import './../styles/App.css';
import Select, { components } from 'react-select';
import Files from '../containers/Files';
import FileUpload from './FileUpload';
class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      selected: null
    };
    this.OnSubmitForm = this.OnSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/files')
      .then(response => response.json())
      .then(files => this.setState({ files: files['files'] }));
  }
  
  
  OnSubmitForm(e) {
    e.preventDefault();
    console.log(this.state.selected);
	//alert('This functionality is under construction. Sorry for the inconvenience');
  }
 
  handleChange(event){
    console.log(event.target.value);
    this.setState({selected: event.target.value});
  }

  render() {
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
              {this.state.files.map(file => (
                <option value={file}>{file}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default History;
