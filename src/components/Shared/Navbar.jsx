import React, { useState } from "react";
import { FaUserCircle, FaSearch, FaBell } from "react-icons/fa";
import logo from "../assets/Logo.jpeg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_under");
    localStorage.removeItem("userRole");
    localStorage.removeItem("usertype");
    localStorage.removeItem("isProfile");
    navigate("/");
  };
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-20 px-8 py-4 flex items-center justify-between shadow-lg border-b border-gray-200"
      style={{
        background: "linear-gradient(90deg, #F5F8FA 0%, #E6F0FA 100%)",
      }}
    >
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <motion.img
          whileHover={{ scale: 1.1, rotate: 5 }}
          src={logo}
          alt="Logo"
          className="h-12 w-12 rounded-full shadow-md border-2 border-blue-500"
        />
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          SABBPE
        </h1>
      </div>

      {/* Right Section: Search, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaSearch className="text-2xl" />
        </motion.button>

        {/* Notification Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-gray-600 hover:text-blue-600 transition-colors relative"
        >
          <FaBell className="text-2xl" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-4xl text-gray-700 hover:text-blue-600 transition-colors" />
          </motion.button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl"
            >
              <ul className="py-2">
                <li>
                  <a
                    onClick={()=>navigate('/my-profile')}
                    className="block px-4 py-3 text-base cursor-pointer text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-3 text-base text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-3 text-base text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;
