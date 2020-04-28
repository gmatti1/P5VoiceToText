import React from 'react';
import {render, cleanup} from '@testing-library/react';

/**
 * This is the Test file for HistTriggerButton component.
 *
 * @version 1.0
 * @author [Shashidhar Reddy Vanteru] <svanter1@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

afterEach(cleanup)
it('should render a div', () => {
	const { container } = render(<button />)
	expect(container.firstChild);
});