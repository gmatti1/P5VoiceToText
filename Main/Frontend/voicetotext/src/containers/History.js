import React, { Component } from './../../node_modules/react';
import './../styles/index.css';
import './../styles/App.css';
import Files from '../containers/Files';

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(files => this.setState({ files: files }));
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

          <Files files={this.state.files} />
        </form>
      </div>
    );
  }
}

export default History;
