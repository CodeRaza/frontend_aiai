import React, { useState } from 'react';
import './header.css'; // Navbar-specific CSS
import headerLogo from '../../Images/Header_logo.svg';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
            <img src= {headerLogo} width={'100px'} alt="Logo" />
        </div>
        <div className="menu-toggle" id="mobile-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="nav-links">
          <li><a href="#">Product</a></li>
          <li><a href="#">Resources</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact Sales</a></li>
          <li><a href="#">Sign In</a></li>
          <li><a href="#free-trial" className="start-free-trial">Start Free Trial</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
