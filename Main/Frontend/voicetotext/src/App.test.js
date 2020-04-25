import React from 'react';
import {render, cleanup} from '@testing-library/react';
import App from './App';

/**
 * This is the test file for App component. 
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

afterEach(cleanup)
it('should take a snapshot', () => {
	const { asFragment } = render(<App />)
	expect(asFragment(<App />)).toMatchSnapshot()
});

