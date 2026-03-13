import React from 'react';
import { Link } from 'react-router-dom';
// React Icon imports for  attractive visual enhancement in navbar
import { GiHarryPotterSkull } from "react-icons/gi";
import { FaBookSkull } from "react-icons/fa6";
import { GiDeathStar } from "react-icons/gi";
import { CgGhostCharacter } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";

// Provides routing links to different sections of the application
function Navbar() {
  return (
    <nav className="navbar">
     
     {/* Application logo  */}
      <div className="navbar-logo">
        <GiHarryPotterSkull /> Harry Potter here Guys...
      </div>
      
      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/books" className="nav-link">
          <FaBookSkull /> Books
        </Link>
        <Link to="/spells" className="nav-link">
          <GiDeathStar /> Spells
        </Link>
        <Link to="/characters" className="nav-link">
          <CgGhostCharacter /> Characters
        </Link>
        <Link to="/houses" className="nav-link">
         <FaHouse /> Houses
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;