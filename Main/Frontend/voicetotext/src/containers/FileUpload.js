import React, { Suspense } from 'react';
import './../styles/App.css';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
//import ConvertedText from '../containers/ConvertedText';
//import CategorizedText from '../containers/CategorizedText';
//import Thirdpage from '../components/Thirdpage';
import Loader from '../containers/Loader';
//import { PropTypes } from 'react';
//import equal from 'fast-deep-equal';
//import styled from 'styled-components';

const ConvertedText = React.lazy(() =>
  slowImport(import('../containers/ConvertedText'), 65000)
);
const CategorizedText = React.lazy(() =>
  slowImport(import('../containers/CategorizedText'), 65000)
);

const History = React.lazy(() =>
  slowImport(import('../containers/History'), 1000)
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
      convertedText: '',
      textdone:false,
      disabled: false,
      istextupdated:false,
      stats: []
    };

    this.OnSubmittingForm = this.OnSubmittingForm.bind(this);
    this.Upload_file = this.Upload_file.bind(this);
  }

  Upload_file(file) {
    this.getTextHelper();
  }

  getTextHelper = () => {
    const formData = new FormData();
    formData.append('file', this.uploadInput.files[0]);
    fetch('http://localhost:5000/files', {
      method: 'POST',
      body: formData
    }).then(response => {
      response
        .json()
        .then(data => {
          this.setState({ isLoaded: true, filename: data['filename'] });
        })
        // .then(data => {
        //   this.fetchcalltext(this.state.filename);
        // });
    });
  };



  OnSubmittingForm(e) {
    e.preventDefault();
    this.Upload_file();
    alert(
      'Your file has been uploaded. Result will be displayed in some time. Thank you for your patience!'
    );
    // this.fecthcallcategory(); //Call this method once fetching text is successful
    this.setState({ disabled: true });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("after change");
    const data = this.state.convertedText;

    var myBody = {
      text: data
    };

    fetch('http://localhost:5000/convertedText/' + this.state.filename, {
      method: 'PUT',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => this.updateCategorizedText());
  };

  updateCategorizedText() {
    fetch('http://localhost:5000/categorizedText/' + this.state.filename, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(textCategorized => {
        console.log(textCategorized);
        this.setState({ textCategorized: textCategorized });
      });
  }

  handleChange = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ convertedText: event.target.value });
  };

  handleChangeupload = event => {
    if (event.target.value != null) {
      console.log(event.target.value);
      localStorage.setItem('value', event.target.value);
      this.setState({ disabled: false });
    }
  };
  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload=e=> {

      e.preventDefault();
      e.returnValue = true;
      
    
  }

 
  componentDidUpdate() {
    
   if(this.state.isLoaded){
    this.fetchcalltext(this.state.filename);
    this.setState({isLoaded:false});
  //this.state.isLoaded= false;
   }
   if(this.state.textdone){
    this.fecthcallcategory(this.state.filename);
    this.setState({textdone:false});
    //this.state.textdone=false;

   }

   }

//    window.onbeforeunload = function() {
//     return "Leaving this page will reset the wizard";
// };


  

  fetchcalltext(file) {
    //event.preventDefault();
    console.log('here');
    this.setState({ loading: true });
    fetch('http://localhost:5000/convertedText/' + file, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).
      then(response => response.json())
      .then(title =>
        this.setState({
          convertedText: title['text'],
          stats: title['stats'],
          textdone:true
        })
      
      )
     //.then(data => this.fecthcallcategory(file))
  }

  fecthcallcategory(file) {
    this.setState({ loading: true });
    fetch('http://localhost:5000/categorizedText/' + file, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(textCategorized => {
        this.setState({ textCategorized: textCategorized });
      })

   
  }

  getConfidence(){
    console.log(this.state.stats);
    var arr = this.state.stats;
    var total = 0;
    var count = 0;
    for(var i = 0; i<arr.length;i++){
      if(arr[i].type === "pronunciation"){
        total += parseFloat(arr[i].alternatives[0].confidence)
        count++;
      }
    }
    total /= count;
    return total.toString();
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
            onChange={this.handleChangeupload}

          />
          <button
            className='Buttonformat'
            type='submit'
            disabled={this.state.disabled}
          >
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
            Go To History
            <span className='tooltiptext'>Previously uploaded files</span>
          </button>
        </Link>

        <div className='Textdata'>
          <label className='LabelTextdata'>Converted Text</label>
          {!this.state.loading ? (
            <div></div>
          ) : (
              <div>
                <label className='LabelTextdata'>Total Confidence : {this.getConfidence()}</label>
                <Suspense fallback={<Loader />}>
                  <ConvertedText
                    loading={this.state.loading}
                    convertedText={this.state.convertedText}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                  />
                </Suspense>
            </div>
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