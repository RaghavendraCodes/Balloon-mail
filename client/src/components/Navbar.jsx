import React, { useState } from 'react';
import Logo from '../assets/Mail_Send-removebg-preview.png';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center space-x-3 ml-4">
            <img src={Logo} alt="Balloon Mail Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-gray-900">
              Balloon <span className="text-blue-500">Mail</span>
            </h1>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6 mr-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="about"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="contact"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="block md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg mt-2 p-4">
          <Link
            to="/"
            className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="contact"
            className="block text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
