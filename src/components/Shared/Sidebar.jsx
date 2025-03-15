import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`bg-blue-900 w-64 p-4 shadow-md transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed top-0 left-0 h-screen z-10`}
    >
      <div className="pt-16">
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
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            OnBoarding
          </button>
          <button
            onClick={() => navigate("/products")}
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            Products
          </button>
          <button
            onClick={() => navigate("/transactions")}
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            Transactions
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            Settings
          </button>
          <button
            onClick={() => navigate("/help")}
            className="w-full text-left p-2 text-gray-200 hover:bg-blue-800 rounded-md transition duration-200"
          >
            Help
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;