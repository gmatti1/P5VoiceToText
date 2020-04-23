import React from 'react';
import './../styles/App.css';
import { Link } from './../../node_modules/react-scroll';
import { slowImport } from '../containers/Helper';
import Loader from '../containers/Loader';
import PopUp from '../containers/PopUp';
import ConvertedText from '../containers/ConvertedText';
import CategorizedText from '../containers/CategorizedText';

/**
 * This is the Upload file component. 
 * It includes all the event handling for second page and backend API calls. 
 * It calls ConvertedText, CategorizedText and PopUp components.
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @author [Surya Cherukuri] <scheruk5@asu.edu>
 * @author [Gangadhara Matti] <gmatti1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
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
	
	/**
     * This method gets called by OnSubmittingForm event handler.
     *
     */
	Upload_file(file) 
	{
		this.setState({
		uploadButtonClicked: true,
		});
		this.getTextHelper();
	}
	
	/**
     * This method gets called by Upload_file method.
	 * It uploads the file on the backend using PSOT request.
     *
     */
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
	
	/**
	 *
     * Gets called when the user clicks on the upload button and form is submitted.
     */
	OnSubmittingForm(e) 
	{
		e.preventDefault();
		this.Upload_file();
		alert(
		  'Your file has been uploaded. Result will be displayed in some time. Thank you for your patience!'
		);
		this.setState({ disabled: true });
	}
	
	/**
	 *
     * Gets called when the user click on the save button in ConvertedText component.
	 * It uses the PUT request for saving the changes made to converted text 
	 * and calls the updateCategorizedText method.
     */
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
	
	/**
	 *
     * Gets called by handleSubmit event handler for save button in ConvertedText component.
	 * It calls formatCategories method to reflect changes on the categorizedText component.
     */
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

	
	/**
	 *
     * Gets called when user try to edit the text in the ConvertedText component textarea.
     */
	handleChange = (event) => {
		event.preventDefault();
		this.setState({ convertedText: event.target.value });
	};

	/**
	 *
     * Gets called when the user selects a file to upload.
     */
	handleChangeupload = (event) => {
		if (event.target.value != null) {
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

	beforeunload = (e) => {
		e.preventDefault();
		e.returnValue = true;
	};

	
	/**
	 *
     * Once file is uploaded, this gets called.
	 * It calls fetchcalltext and fecthcallcategory methods.
     */
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
	
	/**
	 *
     * It uses POST request for backend API to get converted text 
	 * and confidence of the words in the converted text
     */
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

	/**
	 *
     * It uses POST request for backend API to get values of IMIST-AMBO categories. 
     */
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

	/**
	 *
     * Gets called by updateCategorizedText method.
	 * It reflects the changes made to converted text on the categorizedText component.
     */
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

	/**
	 *
     * It calculates the average confidence of the entire converted text by 
	 * using confidence of the words in the converted text.
	 * 
     */
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
		
		// Name of the button that opens the PopUp Modal to add new keywords for IMIST-AMBO.
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

