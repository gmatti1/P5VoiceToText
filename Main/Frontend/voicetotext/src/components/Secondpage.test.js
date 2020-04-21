import React from 'react';

import {render, cleanup} from '@testing-library/react';

import Secondpage from './Secondpage';

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
  const { asFragment } = render(<Secondpage />)
  
  expect(asFragment(<Secondpage />)).toMatchSnapshot()
 });

