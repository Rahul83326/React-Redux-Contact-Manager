import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyles = {
    backgroundColor: '#FA8BFF', // Background color
    backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)', // Gradient
    padding: '1rem 0', // Padding top and bottom
  };

  const brandStyles = {
    marginLeft: '1.5rem', // Adjust the left margin for the brand
    color: 'white', // White text color
    textDecoration: 'none', // Remove underline from the link
  };

  return (
    <div className="col-md-12" style={navbarStyles}>
      <nav className="navbar" style={navbarStyles}>
        <Link to="/" className="navbar-brand" style={brandStyles}>
          Redux Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
