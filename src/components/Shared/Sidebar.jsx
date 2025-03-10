import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserPlus,
  faBox,
  faExchangeAlt,
  faCog,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/Dashboard", label: "Dashboard", icon: faTachometerAlt },
    { path: "/Profile", label: "OnBoarding", icon: faUserPlus },
    { path: "/products", label: "Products", icon: faBox },
    { path: "/transactions", label: "Transactions", icon: faExchangeAlt },
    { path: "/settings", label: "Settings", icon: faCog },
    { path: "/help", label: "Help", icon: faQuestionCircle },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 w-64 bg-blue-900 text-white shadow-md transition-transform duration-300 h-full min-h-screen overflow-y-auto ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-white text-2xl"
          aria-label="Close Sidebar"
        >
          ✕
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map(({ path, label, icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center w-full text-left p-2 rounded-md transition duration-200 ${
              location.pathname === path ? "bg-blue-700" : "hover:bg-blue-800"
            }`}
          >
            <FontAwesomeIcon icon={icon} className="mr-3" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
