import React, { Component } from './../../node_modules/react';
import HistPopUp from '../containers/HistPopUp';
import './../styles/index.css';
import './../styles/App.css';
//import Select, { components } from 'react-select';
//import Files from '../containers/Files';
//import FileUpload from './FileUpload';
class History extends Component {
  constructor(props) {
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
      selected: null,
	  search: ''
    };
  
    this.handleChangeselect = this.handleChangeselect.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload);
    fetch('/api/files')
      .then(response =>
        
        response.json()).then(files => this.setState({ files: files['files'] }))
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
    console.log(this.state.invalue);
  }
  
  handleChangeTeatarea = event => {
	  this.setState({invalue: event.target.value});
	  
  }
 
  handleChangeselect(event){
    console.log(event.target.value);
    this.setState({selected: event.target.value});
    this.Upload_History_file(event.target.value);

  }
  Upload_History_file(file1){

  fetch('/api/convertedText/' + file1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).
    then(response => response.json())
    .then(title =>
      {
       // console.log(title),
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
      //this.state.loading =true;
      
      //console.log(this.state.loading);
      

}

formatCategories(textCategorized){
  var i = 0;
  var textArr = [];
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

  render() {
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
            <select size='10' value={this.state.select} onChange={this.handleChangeselect}  className='Historyselect' required>
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
		 <HistPopUp invalueother={this.state.invalueother} invalue={this.state.invalue} triggerText={triggerText} onSubmit={this.onSubmit.bind(this)} handleChangeTeatarea={this.handleChangeTeatarea.bind(this)}/>
      </div>
    );
  }
}

export default History;
