import React from 'react';
import './../styles/App.css';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
import Loader from '../containers/Loader';
import PopUp from '../containers/PopUp';
import ConvertedText from '../containers/ConvertedText';
import CategorizedText from '../containers/CategorizedText';

/**
 * 
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru]
 * @copyright [Copyright 2020, P5VoiceToText]
 * @credits  [Shashidhar Reddy Vanteru]
 * @email "svanter1@asu.edu"
 * 
 */

class FileUpload extends React.Component {
	constructor(props) 
	{
		super(props);

		this.state = {
			isFileUploaded: null,
			title: '',
			textCategorized: [],
			loading: false,
			filename: '',
			convertedText: '',
			textdone: false,
			disabled: false,
			istextupdated: false,
			targetElement: null,
			stats: [],
			uploadButtonClicked: false,
		};

		this.OnSubmittingForm = this.OnSubmittingForm.bind(this);
		this.Upload_file = this.Upload_file.bind(this);
	}

	Upload_file(file) 
	{
		this.setState({
		uploadButtonClicked: true,
		});
		this.getTextHelper();
	}

	getTextHelper = () => {
		const formData = new FormData();
		formData.append('file', this.uploadInput.files[0]);
		fetch('/api/files', {
		method: 'POST',
		body: formData,
		}).then((response) => {
		response.json().then((data) => {
		this.setState({ isLoaded: true, filename: data['filename'] });
		});
		});
	};

	OnSubmittingForm(e) 
	{
		e.preventDefault();
		this.Upload_file();
		alert(
		  'Your file has been uploaded. Result will be displayed in some time. Thank you for your patience!'
		);
		this.setState({ disabled: true });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const data = this.state.convertedText;
		var myBody = {
		  text: data,
		};
		fetch('/api/convertedText/' + this.state.filename, {
		method: 'PUT',
		body: JSON.stringify(myBody),
		headers: {
		'Content-Type': 'application/json',
		},
		}).then((response) => this.updateCategorizedText());
	};

	updateCategorizedText() 
	{
		fetch('/api/categorizedText/' + this.state.filename, {
		method: 'PUT',
		headers: {
        'Content-Type': 'application/json',
		},
		})
		.then((response) => response.json())
		.then((textCategorized) => {
        this.formatCategories(textCategorized);
		});
	}

	handleChange = (event) => {
		event.preventDefault();
		this.setState({ convertedText: event.target.value });
	};


  handleChangeupload = (event) => {
    if (event.target.value != null) {
      localStorage.setItem('value', event.target.value);
      this.setState({ disabled: false });
    }
  };
  componentDidMount() {
    this.targetElement = document.querySelector('#popup1');
    window.addEventListener('beforeunload', this.beforeunload);
  }

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.beforeunload);
	}

	beforeunload = (e) => {
		e.preventDefault();
		e.returnValue = true;
	};

	componentDidUpdate() {
		if (this.state.isLoaded) {
		  this.fetchcalltext(this.state.filename);
		  this.setState({ isLoaded: false });
		}
		if (this.state.textdone) {
		  this.fecthcallcategory(this.state.filename);
		  this.setState({ textdone: false });
		}
	}

	fetchcalltext(file) 
	{
		this.setState({ loading: true });
		fetch('/api/convertedText/' + file, {
		method: 'POST',
		headers: {
        'Content-Type': 'application/json',
		},
		})
		.then((response) => response.json())
		.then((title) =>
        this.setState({
        convertedText: title['text'],
        stats: title['stats'],
        textdone: true,
        })
		);
	}

	fecthcallcategory(file) 
	{
		this.setState({ loading: true });
		fetch('/api/categorizedText/' + file, {
		method: 'POST',
		headers: {
        'Content-Type': 'application/json',
		},
		})
		.then((response) => response.json())
		.then((textCategorized) => {
        this.formatCategories(textCategorized);

		});
	}

	formatCategories(textCategorized) {
		var i = 0;
		var textArr = [];
		Object.keys(textCategorized).forEach((key) => {
		var temp = '';
		for (var j = 0; j < textCategorized[key].length; j++) {
			temp += textCategorized[key][j];
			if (j != textCategorized[key].length - 1) temp += '\n';
		}
		textCategorized[key] = temp;
		});
		this.setState({ textCategorized: textCategorized });
		this.setState({ uploadButtonClicked: false });
	}

	componentDidMount() {
		this.targetElement = document.querySelector('#popup1');
	}

	getConfidence() {
		var arr = this.state.stats;
		var total = 0;
		var count = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].type === 'pronunciation') 
			{
				total += parseFloat(arr[i].alternatives[0].confidence);
				count++;
			}
		}
		if (count !== 0) total /= count;
		return Math.round(total * 100).toString() + '%';
	}


	render() {
		const triggerText = 'Add keyword for IMIST-AMBO';
		return (
			<div>
				<form onSubmit={this.OnSubmittingForm}>
					<h1 className='Uploadheader'>Please upload the audio file</h1>
					<input
					className='Input'
					type='file'
					ref={(ref) => {
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
					onClick={this.fetchlist}
					>
						Go To History
						<span className='tooltiptext'>Previously uploaded files</span>
					</button>
				</Link>
				<div className='Textdata'>
					<label className='LabelTextdata'>Converted Text</label>
						{this.state.uploadButtonClicked ? (
						<Loader />
						) : (
						<div>
							<ConvertedText
							loading={this.state.loading}
							convertedText={this.state.convertedText}
							handleSubmit={this.handleSubmit.bind(this)}
							handleChange={this.handleChange.bind(this)}
							/>
						</div>
						)}
					<label className='Confi'>
						Text Confidence : {this.getConfidence()}
					</label>
				</div>

				<div className='Categorydata'>
					<label className='LabelTextdata'>Categorized Text</label>
						{this.state.uploadButtonClicked ? (
						<Loader />
						) : (
						<CategorizedText
						loading={this.state.loading}
						textCategorized={this.state.textCategorized}
						/>
						)}
				</div>
				<PopUp triggerText={triggerText} />
			</div>
		);
	}
}

export default FileUpload;

