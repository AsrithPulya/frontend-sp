import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = { name: "Alex Johnson" }; // Mock user data

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    
    // Optionally, you can also clear session storage if you're using it
    sessionStorage.clear();
    
    // Clear any other browser storage or state if needed
    // For example, if you're using cookies, you might want to clear them too
    
    // Navigate to the root route (or login page)
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">SabPe Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">{user.name}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;