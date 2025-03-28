import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUser,
  FaBox,
  FaExchangeAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
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
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#1E3A8A] to-[#1E40AF] w-72 p-8 shadow-xl fixed top-16 left-0 h-[calc(100vh-64px)] z-10 overflow-y-auto"
    >
      {/* <div className="border-t border-gray-500 my-4"></div> */}
      <nav className="space-y-3">
        {[
          { path: "/Dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
          { path: "/Profile", label: "OnBoarding", icon: <FaUser /> },
          { path: "/create-user", label: "Create User", icon: <FaUserPlus /> },
          { path: "/Products", label: "Products", icon: <FaBox /> },
          { path: "/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
          { path: "/settings", label: "Settings", icon: <FaCog /> },
          { path: "/help", label: "Help", icon: <FaQuestionCircle /> },
          // Add more items to test scrolling (optional)
          // { path: "/extra1", label: "Extra 1", icon: <FaCog /> },
          // { path: "/extra2", label: "Extra 2", icon: <FaQuestionCircle /> },
        ].map(({ path, label, icon }) => (
          <motion.button
            key={path}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation(path)}
            className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
              isActive(path)
                ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                : "hover:bg-[#2563EB]"
            }`}
          >
            <span className={`text-2xl ${isActive(path) ? "text-white" : "hover:text-white"}`}>
              {icon}
            </span>
            <span>{label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;