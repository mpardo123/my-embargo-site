import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamsDropdownOpen, setTeamsDropdownOpen] = useState(false); // State for "Teams" dropdown
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false); // State for "More" dropdown

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setTeamsDropdownOpen(false); // Close "Teams" dropdown when toggling menu
    setMoreDropdownOpen(false); // Close "More" dropdown when toggling menu
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setTeamsDropdownOpen(false); // Close "Teams" dropdown
    setMoreDropdownOpen(false); // Close "More" dropdown
  };

  const toggleTeamsDropdown = () => {
    if (menuOpen) {
      setTeamsDropdownOpen(!teamsDropdownOpen);
      setMoreDropdownOpen(false); // Ensure "More" dropdown is closed
    }
  };

  const toggleMoreDropdown = () => {
    if (menuOpen) {
      setMoreDropdownOpen(!moreDropdownOpen);
      setTeamsDropdownOpen(false); // Ensure "Teams" dropdown is closed
    }
  };

  const handleLinkClick = () => {
    closeMenu(); // Close all menus and dropdowns
  };

  return (
    <header className="top-bar">
      <div className="logo-circle">
        <img src="/embargo.jpg" alt="League Logo" />
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <div className={`dropdown ${teamsDropdownOpen ? 'open' : ''}`}>
          <button className="dropbtn" onClick={toggleTeamsDropdown}>
            Teams
          </button>
          <div className="dropdown-content">
            <Link to="/teams/allseason" onClick={handleLinkClick}>All Season Services</Link>
            <Link to="/teams/ampd" onClick={handleLinkClick}>Amp'd Up</Link>
            <Link to="/teams/basins" onClick={handleLinkClick}>Buzzards Bay Basins</Link>
            <Link to="/teams/bwpc" onClick={handleLinkClick}>Better Way Primary Care</Link>
            <Link to="/teams/cantara" onClick={handleLinkClick}>Cantara Brothers Co</Link>
            <Link to="/teams/cornerstone" onClick={handleLinkClick}>Cornerstone Financial</Link>
            <Link to="/teams/mattpd" onClick={handleLinkClick}>Mattapoisett PD</Link>
            <Link to="/teams/minkle" onClick={handleLinkClick}>Minkle Boys / SPM</Link>
            <Link to="/teams/oss" onClick={handleLinkClick}>OSS Landscape</Link>
            <Link to="/teams/riverjunction" onClick={handleLinkClick}>River Junction</Link>
            <Link to="/teams/rock" onClick={handleLinkClick}>Rock Electric</Link>
            <Link to="/teams/trops" onClick={handleLinkClick}>Tropical Smoothie</Link>
            <Link to="/teams/travelers" onClick={handleLinkClick}>Traveler's Alehouse</Link>
            <Link to="/teams/washashore" onClick={handleLinkClick}>Wash Ashore</Link>
          </div>
        </div>
        <Link to="/schedule" onClick={handleLinkClick}>Schedule</Link>
        <Link to="/standings" onClick={handleLinkClick}>Standings</Link>
        <Link to="/statistics" onClick={handleLinkClick}>Statistics</Link>
        <Link to="/awards" onClick={handleLinkClick}>Awards</Link>
        <Link to="/sponsors" onClick={handleLinkClick}>Sponsors</Link>
        <div className={`dropdown more ${moreDropdownOpen ? 'open' : ''}`}>
          <button className="dropbtn" onClick={toggleMoreDropdown}>
            More
          </button>
          <div className="dropdown-content">
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <Link to="/about" onClick={handleLinkClick}>About Us</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;