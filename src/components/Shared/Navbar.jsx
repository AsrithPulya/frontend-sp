import React from "react";
import logo from "../assets/Logo.jpeg";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full shadow-md z-20" style={{ height: "64px" }}>
      <div className="flex items-center justify-start space-x-4">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white hover:text-gray-200 focus:outline-none ml-auto"
        >
          <svg
            className="w-6 h-6"
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
        </button>
      </div>
    </header>
  );
};

export default Navbar;