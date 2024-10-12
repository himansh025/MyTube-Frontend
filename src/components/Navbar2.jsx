import React, { useState } from 'react';
import { CgTv } from 'react-icons/cg';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
  // const [showDropdown, setShowDropdown] = useState(false);
  // const navigate = useNavigate();

  // const handleUserCircleClick = () => {
  //   setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  // };

  // const handleLogout = () => {
  //   setShowDropdown(false);  // Close the dropdown
  //   navigate("/logout");     // Redirect to the logout route
  //   console.log('User logged out');
  // };

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 fixed top-0 left-0 w-full z-10 shadow-md">
      {/* Left section with logo */}
      <div className="flex items-center">
        <CgTv className="text-red-600 text-3xl" />
        <span className="ml-2 text-xl font-bold text-red-600">WatchTv</span>
      </div>

      {/* Search bar */}
      <div className="flex items-center mx-4 w-full sm:w-auto lg:w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
        />
        <button className="ml-2 p-2 bg-gray-200 border border-gray-300 rounded-full hover:bg-gray-300">
          <FaSearch />
        </button>
      </div>

      {/* Right section for user-related icons */}
      {/* Uncomment this if you need the user dropdown functionality */}
      {/* <div className="relative">
        <FaUserCircle
          onClick={handleUserCircleClick}
          className="text-3xl cursor-pointer"
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg py-2">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar2;
