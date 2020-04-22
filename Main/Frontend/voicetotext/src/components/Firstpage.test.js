import React from 'react';
import {render, cleanup} from '@testing-library/react';
import FirstPage from './Firstpage';
 
 /**
 *
 * This is the test file for FirstPage component.
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText]
 * 
 */

afterEach(cleanup)
it('should take a snapshot', () => {
	const { asFragment } = render(<FirstPage />)
	expect(asFragment(<FirstPage />)).toMatchSnapshot()
});

