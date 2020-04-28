import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './../navigation/Navbar';
import arrow from './../assets/arrow.png';
import { Link } from './../../node_modules/react-scroll';

/**
 * This is the Firstpage, which is the Landing page of the P5VoiceToText web application.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */

function Firstpage() 
{
	return (
		<div className='Firstpage'>
			<Navbar />
			<div className='App-bg' />
			<header className='Appheaderfp'>
				<h1 className='Apptitlefp'>
					Voice-To-Text Application of Pediatric IMIST-AMBO Criteria
				</h1>
			</header>
			<header className='App-footer'>
				<Link
				activeClass='active'
				to='main'
				spy={true}
				smooth={true}
				offset={0}
				duration={500}
				>
					<button >
						<img src={arrow} className='Arrow' alt='arrow' />
					</button>
				</Link>
			</header>
		</div>
	);
}

export default Firstpage;
