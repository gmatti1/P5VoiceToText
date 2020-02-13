import React from 'react';
import './../styles/App.css';
import logo from './../assets/pchlogo.png';

function Navbar() {
  return (
    <div className='Navbarsize'>
      <nav className='navbar sticky-top justify-content-center navbar-light bg-light'>
        <img src={logo} className='App-logobig' alt='Website logo' />
      </nav>
    </div>
  );
}

export default Navbar;
