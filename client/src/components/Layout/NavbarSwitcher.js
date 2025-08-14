import React, { useState } from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import { FaExchangeAlt } from 'react-icons/fa';

const NavbarSwitcher = () => {
  const [currentNavbar, setCurrentNavbar] = useState('modern');

  const switchNavbar = () => {
    setCurrentNavbar(currentNavbar === 'modern' ? 'futuristic' : 'modern');
  };

  return (
    <>
      {/* Navbar Switcher Button */}
      <button
        onClick={switchNavbar}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 group"
        title={`Switch to ${currentNavbar === 'modern' ? 'Futuristic' : 'Modern'} Navbar`}
      >
        <FaExchangeAlt className="text-xl group-hover:rotate-180 transition-transform duration-300" />
        <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Switch to {currentNavbar === 'modern' ? 'Futuristic' : 'Modern'} Design
        </div>
      </button>

      {/* Render Current Navbar */}
      {currentNavbar === 'modern' ? <Navbar /> : <Navbar2 />}
    </>
  );
};

export default NavbarSwitcher;
