import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`bg-white w-64 p-4 shadow-md transform md:translate-x-0 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:static fixed top-0 left-0 h-full z-10`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
      <nav className="space-y-2">
        <button
          onClick={() => navigate("/Dashboard")}
          className="w-full text-left p-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/transactions")}
          className="w-full text-left p-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
        >
          Transactions
        </button>
        <button
          onClick={() => navigate("/Profile")}
          className="w-full text-left p-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
        >
          Profile
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="w-full text-left p-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;