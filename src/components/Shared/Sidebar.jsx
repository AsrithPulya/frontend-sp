import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaUser, FaBox, FaExchangeAlt, FaCog, FaQuestionCircle } from "react-icons/fa";

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
    <aside
      className="bg-gradient-to-b from-[#14213D] to-[#1D3557] w-80 p-6 shadow-lg fixed top-16 left-0 h-[calc(100vh-64px)] z-10"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Menu</h2>
      </div>
      <div className="border-t border-gray-600 my-4"></div>
      <nav className="space-y-4">
        <button
          onClick={() => handleNavigation("/Dashboard")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/Dashboard") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaTachometerAlt className={`text-2xl ${isActive("/Dashboard") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => handleNavigation("/Profile")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/Profile") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaUser className={`text-2xl ${isActive("/Profile") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>OnBoarding</span>
        </button>
        <button
          onClick={() => handleNavigation("/create-user")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/create-user") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaUserPlus className={`text-2xl ${isActive("/create-user") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Create User</span>
        </button>
        <button
          onClick={() => handleNavigation("/Products")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/Products") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaBox className={`text-2xl ${isActive("/Products") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Products</span>
        </button>
        <button
          onClick={() => handleNavigation("/transactions")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/transactions") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaExchangeAlt className={`text-2xl ${isActive("/transactions") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Transactions</span>
        </button>
        <button
          onClick={() => handleNavigation("/settings")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/settings") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaCog className={`text-2xl ${isActive("/settings") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Settings</span>
        </button>
        <button
          onClick={() => handleNavigation("/help")}
          className={`w-full flex items-center space-x-4 p-3 text-lg font-medium text-gray-200 rounded-lg transition duration-300 ${
            isActive("/help") ? "bg-[#2A4066] text-white" : "hover:bg-gradient-to-r from-[#2A4066] to-[#3A5A80]"
          }`}
        >
          <FaQuestionCircle className={`text-2xl ${isActive("/help") ? "text-white" : "hover:text-indigo-300"}`} />
          <span>Help</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;