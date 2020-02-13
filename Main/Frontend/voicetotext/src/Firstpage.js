import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import arrow from './arrow.png';
import { Link, animateScroll as scroll } from "react-scroll";

function Firstpage() {
  
    return (
      <div className="Firstpage"> 
	  <Navbar />
		<div className="App-bg" />
			<header className="Appheaderfp">
				<h1 className="Apptitlefp">
					Voice-To-Text Application of Pediatric IMIST-AMBO Criteria
				</h1>
				
			</header>
			<header className="App-footer">
				<Link
    activeClass="active"
    to="main"
    spy={true}
    smooth={true}
    offset={0}
    duration= {500}
> <a href="#"><img src={arrow} className="Arrow" alt="arrow" /></a> </Link>
			</header>
			
	</div>
    );
  }

export default Firstpage;
