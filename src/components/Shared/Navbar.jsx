import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/Logo.jpeg";

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-20 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo & Dashboard Title */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            Profile
          </a>
        </nav>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-900 focus:outline-none"
          >
            <FaUserCircle className="text-gray-700 text-3xl" />
          </button>

          {/* Profile Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <ul className="py-2">
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-900 hover:text-gray-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
