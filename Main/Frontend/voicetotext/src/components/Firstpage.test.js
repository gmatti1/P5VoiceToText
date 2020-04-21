import React from 'react';

import {render, cleanup} from '@testing-library/react';
import FirstPage from './Firstpage';

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
  const { asFragment } = render(<FirstPage />)
  
  expect(asFragment(<FirstPage />)).toMatchSnapshot()
 });

