import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUserPlus, FaUser, FaBox, FaExchangeAlt, FaCog, FaQuestionCircle } from "react-icons/fa"; // Import icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`bg-blue-900 w-64 p-4 shadow-md transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed top-16 left-0 h-[calc(100vh-64px)] z-10`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-white"
        >
          ✕
        </button>
      </div>
      <nav className="space-y-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaTachometerAlt className="text-gray-200" /> {/* Dashboard icon */}
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaUser className="text-gray-200" /> {/* OnBoarding icon */}
          <span>OnBoarding</span>
        </button>
        <button
          onClick={() => navigate("/create-user")} // Note: This route is the same as OnBoarding, you might want to update this
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaUserPlus className="text-gray-200" /> {/* Create User icon */}
          <span>Create User</span>
        </button>
        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaBox className="text-gray-200" /> {/* Products icon */}
          <span>Products</span>
        </button>
        <button
          onClick={() => navigate("/transactions")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaExchangeAlt className="text-gray-200" /> {/* Transactions icon */}
          <span>Transactions</span>
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaCog className="text-gray-200" /> {/* Settings icon */}
          <span>Settings</span>
        </button>
        <button
          onClick={() => navigate("/help")}
          className="w-full flex items-center space-x-3 p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
        >
          <FaQuestionCircle className="text-gray-200" /> {/* Help icon */}
          <span>Help</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;