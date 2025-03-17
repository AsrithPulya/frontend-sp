import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaUser, FaBox, FaExchangeAlt, FaCog, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    console.log(`Attempting to navigate to: ${path}`);
    console.log(`Current location: ${location.pathname}`);
    navigate(path);
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#1E3A8A] to-[#1E40AF] w-72 p-8 shadow-xl fixed top-20 left-0 h-[calc(100vh-80px)] z-10"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">Menu</h2>
      </div>
      <div className="border-t border-gray-500 my-4"></div>
      <nav className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/Dashboard")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/Dashboard")
              ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
              : "hover:bg-[#2563EB]"
          }`}
        >
          <FaTachometerAlt className={`text-2xl ${isActive("/Dashboard") ? "text-white" : "hover:text-white"}`} />
          <span>Dashboard</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/Profile")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/Profile") ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30" : "hover:bg-[#2563EB]"
          }`}
        >
          <FaUser className={`text-2xl ${isActive("/Profile") ? "text-white" : "hover:text-white"}`} />
          <span>OnBoarding</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/create-user")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/create-user")
              ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
              : "hover:bg-[#2563EB]"
          }`}
        >
          <FaUserPlus className={`text-2xl ${isActive("/create-user") ? "text-white" : "hover:text-white"}`} />
          <span>Create User</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/Products")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/Products") ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30" : "hover:bg-[#2563EB]"
          }`}
        >
          <FaBox className={`text-2xl ${isActive("/Products") ? "text-white" : "hover:text-white"}`} />
          <span>Products</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/transactions")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/transactions")
              ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
              : "hover:bg-[#2563EB]"
          }`}
        >
          <FaExchangeAlt className={`text-2xl ${isActive("/transactions") ? "text-white" : "hover:text-white"}`} />
          <span>Transactions</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/settings")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/settings") ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30" : "hover:bg-[#2563EB]"
          }`}
        >
          <FaCog className={`text-2xl ${isActive("/settings") ? "text-white" : "hover:text-white"}`} />
          <span>Settings</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavigation("/help")}
          className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
            isActive("/help") ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30" : "hover:bg-[#2563EB]"
          }`}
        >
          <FaQuestionCircle className={`text-2xl ${isActive("/help") ? "text-white" : "hover:text-white"}`} />
          <span>Help</span>
        </motion.button>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;