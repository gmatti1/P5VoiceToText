import React from 'react';
import './../styles/App.css';
import logo from './../assets/pchlogo.png';
 
 /**
 * This is the Navigation bar with logo of the Web application.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 * 
 */
 
function Navbar() 
{
	return (
		<div className='Navbarsize'>
			<nav className='navbar sticky-top justify-content-center' id="navbg">
				<img src={logo} className='App-logobig' alt='Website logo' />	
			</nav>
		</div>
	);
}

export default Navbar;
