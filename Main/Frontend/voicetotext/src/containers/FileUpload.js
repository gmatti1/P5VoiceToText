import React, { Suspense } from 'react';
import './../styles/App.css';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
//import ConvertedText from '../containers/ConvertedText';
//import CategorizedText from '../containers/CategorizedText';
import Thirdpage from '../components/Thirdpage';
import History from '../containers/History';
import Loader from '../containers/Loader';
import { PropTypes } from 'react';
import equal from 'fast-deep-equal';

const ConvertedText = React.lazy(() =>
  slowImport(import('../containers/ConvertedText'), 1000)
);
const CategorizedText = React.lazy(() =>
  slowImport(import('../containers/CategorizedText'), 1000)
);

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFileUploaded: null,
      title: '',
      textCategorized: '',
      /*textCategorized:{ "identification" : [],
							  "mechanism" : [],
							  "injury": [],
							  "signs": [],
							  "treatment": [],
							  "allergy": [],
							  "medication": [],
							  "background": [],
							  "other": [] } ,  */
      loading: false,
      filename: '',
      convertedText: ''
    };

    this.OnSubmittingForm = this.OnSubmittingForm.bind(this);
    this.Upload_file = this.Upload_file.bind(this);
  }

  async Upload_file(file) {
    await this.getTextHelper();
  }

  getTextHelper = () => {
    const formData = new FormData();
    formData.append('file', this.uploadInput.files[0]);
    fetch('http://localhost:5000/files', {
      method: 'POST',
      body: formData
    }).then(response => {
      response.json().then(data => {
        this.setState({ isLoaded: true, filename: data['filename'] });
        console.log(this.state.filename);
        this.fetchcalltext();
      });
    });
  };

  OnSubmittingForm(e) {
    e.preventDefault();
    this.Upload_file();
    // this.fecthcallcategory(); //Call this method once fetching text is successful
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.convertedText;

    var myBody = {
      'text': data
    };

    fetch('http://localhost:5000/files/' + this.state.filename + '/text', {
      method: 'PUT',
      body: myBody,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('Completed it');
    });

    console.log('Edited here text is : ', data);
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ convertedText: event.target.value });
  };

  fetchcalltext() {
    this.setState({ loading: true });
    fetch('http://localhost:5000/files/' + this.state.filename + '/text')
      .then(response => response.json())
      .then(title =>
        this.setState({
          convertedText: title['text']
        })
      );
  }

  fecthcallcategory() {
    this.setState({ loading: true });
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(textCategorized =>
        this.setState({ textCategorized: textCategorized })
      );
  }

  componentShouldUpdate(prevProps) {
    if (!equal(this.props.filename, prevProps.filename)) {
      console.log('rerender the component');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.OnSubmittingForm}>
          <h1 className='Uploadheader'>Please upload the audio file</h1>
          <input
            className='Input'
            type='file'
            ref={ref => {
              this.uploadInput = ref;
            }}
            name='voiceFile'
            required
          />
          <button className='Buttonformat' type='submit'>
            Upload
          </button>
        </form>
        <div className='ORtext'>or</div>
        <Link
          activeClass='active'
          to='hist'
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <button
            className='Historybutton'
            type='submit'
            onclick={this.fetchlist}
          >
            Select From History
            <span className='tooltiptext'>
              History : All the Uploaded files before
            </span>
          </button>
        </Link>

        <div className='Textdata'>
          <label className='LabelTextdata'>Converted Text</label>

          {!this.state.loading ? (
            <div></div>
          ) : (
            <Suspense fallback={<Loader />}>
              <ConvertedText
                loading={this.state.loading}
                convertedText={this.state.convertedText}
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange.bind(this)}
              />
            </Suspense>
          )}
        </div>

        <div className='Categorydata'>
          <label className='LabelTextdata'>Categorized Text</label>

          {!this.state.loading ? (
            <div></div>
          ) : (
            <Suspense fallback={<Loader />}>
              <CategorizedText
                loading={this.state.loading}
                textCategorized={this.state.textCategorized}
              />
            </Suspense>
          )}
        </div>
      </div>
    );
  }
}

export default FileUpload;
