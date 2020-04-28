import React, { Component } from './../../node_modules/react';
import { Button } from 'react-bootstrap';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';
import styled from 'styled-components';

/**
 * This is the Converted Text component. 
 * It displays the voice to text result and a button to save changes to the text.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

const HoverText = styled.textarea`
	color: #000;
	:hover {
		color: #b30000;
		cursor: pointer;
	}
`

class ConvertedText extends Component {
	constructor(props) {
		super(props);
	}

	render() 
	{
		if (!this.props.loading) 
		{
			return null;
		} 
		else 
		{
			return (
				<div>
					<form onSubmit={this.props.handleSubmit}>
						<div className='Textareasize'>
							<HoverText
							className='form-control'
							id='Textarea'
							value={this.props.convertedText}
							onChange={this.props.handleChange}
							required
							/>
						</div>
						<Button className='Save' type='submit'>
							Save
						</Button>
					</form>
				</div>
			);
		}
	}
}

export default ConvertedText;
