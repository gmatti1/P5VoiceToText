import React from 'react';

import {render, cleanup} from '@testing-library/react';



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

afterEach(cleanup)
it('should take a snapshot', () => {
  const { container } = render(<div />)
  
  expect(container.firstChild.Loader);
 });

