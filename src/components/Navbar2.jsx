import React from 'react';
import { CgTv } from 'react-icons/cg';
import { FaSearch, FaBell, FaUserCircle, FaBars, FaYoutube } from 'react-icons/fa';
import { MdWatch } from 'react-icons/md';

const Navbar2 = () => {
  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 shadow-md">
      {/* Left section */} 
      <div className="flex items-center">
        {/* <FaBars className="text-2xl hidden md:block cursor-pointer mr-4" /> */}
        <div className="flex items-center text-gray-500">
          <CgTv className="text-3xl" />
          <span className="ml-1 text-xl font-bold">WatchTv</span>
        </div>
      </div>

      {/* Search bar */}
      {/* <div className="flex items-center flex-1 mx-4">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-r-full hover:bg-gray-300">
          <FaSearch />
        </button>
      </div> */}

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* <FaBell className="text-2xl mx-1 cursor-pointer" /> */}
        <FaUserCircle className=" hidden md:block text-2xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar2;
