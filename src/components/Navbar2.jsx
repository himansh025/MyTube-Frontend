import React, { useState } from 'react';
import { CgTv } from 'react-icons/cg';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 fixed top-0 left-0 w-full z-10 shadow-md">
      {/* Left section with logo */}
      <div className="flex items-center">
        <CgTv className="text-red-600 text-3xl" />
        <span className="ml-2 text-xl font-bold text-red-600">MyTube</span>
      </div>  
    </nav>
  );
};

export default Navbar2;
