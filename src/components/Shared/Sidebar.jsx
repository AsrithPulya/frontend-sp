import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTableList, FaPeopleGroup } from "react-icons/fa6";
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
import { useSelector } from "react-redux";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userActive, setUserActive] = useState(false);
  const isPayment = localStorage.getItem("isPayment") === "true";
  const [loading, setLoading] = useState(false);
  const {refreshNavbar} = useSelector((state)=>state.navbar)
  // console.log(refreshNavbar)
  // console.log(distributorProfileSubmitted)
  // console.log(isPayment)
  const userRole = localStorage.getItem("userRole");
  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    console.log(`Attempting to navigate to: ${path}`);
    console.log(`Current location: ${location.pathname}`);
    navigate(path);
  };

  const token = localStorage.getItem("authToken");
  // console.log(token)
  const fetchDetails = async () => {
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://test.sabbpe.com/api/v1/auth/fetchdistributor",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log(data);
      if (data.isprofile === false) {
        setUserActive(data.isprofile);
        setLoading(false);
      } else if (data[0].account_status === 1) {
        setUserActive(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(userActive);

  useEffect(() => {
    fetchDetails();
  }, [refreshNavbar]);

  useEffect(() => {
    if (userRole === "Zone") {
      return; // Allow "Zone" users to access all pages freely
    }
    if (userActive === false && userRole === "distributor") {
      navigate("/Profile");
    } else {
      navigate("/my-profile");
    }
  }, [userRole, userActive]);

  // console.log(userRole);
  // console.log(userActive)
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
        {loading ? (
          <div className="grid gap-5">
            <div className="inline-block rounded-xl bg-gray-300 animate-pulse w-full space-x-4 p-4 h-12"></div>
            <div className="inline-block rounded-xl bg-gray-300 animate-pulse w-full space-x-4 p-4 h-12"></div>
            <div className="inline-block rounded-xl bg-gray-300 animate-pulse w-full space-x-4 p-4 h-12"></div>
            <div className="inline-block rounded-xl bg-gray-300 animate-pulse w-full space-x-4 p-4 h-12"></div>
            <div className="inline-block rounded-xl bg-gray-300 animate-pulse w-full space-x-4 p-4 h-12"></div>
          </div>
        ) : // Show only OnBoarding if userActive is false and userRole is distributor
        userActive === false && userRole === "distributor" ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/Profile")}
            className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
              isActive("/Profile")
                ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                : "hover:bg-[#2563EB]"
            }`}
          >
            <FaUser className="text-2xl" />
            <span>OnBoarding</span>
          </motion.button>
        ) : (
          // Show all other buttons when userActive is true OR userRole is not "distributor"
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation("/Dashboard")}
              className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                isActive("/Dashboard")
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#2563EB]"
              }`}
            >
              <FaTachometerAlt className="text-2xl" />
              <span>Dashboard</span>
            </motion.button>

            {/* Hide OnBoarding if userActive is true and userRole is "distributor" OR userRole is "Zone" */}
            {!(
              (userActive === true && userRole === "distributor") ||
              userRole === "Zone"
            ) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation("/Profile")}
                className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                  isActive("/Profile")
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-[#2563EB]"
                }`}
              >
                <FaUser className="text-2xl" />
                <span>OnBoarding</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation("/create-user")}
              className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                isActive("/create-user")
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#2563EB]"
              }`}
            >
              <FaUserPlus className="text-2xl" />
              <span>Create User</span>
            </motion.button>

            {userRole !== "distributor" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation("/Products")}
                className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                  isActive("/Products")
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-[#2563EB]"
                }`}
              >
                <FaBox className="text-2xl" />
                <span>Products</span>
              </motion.button>
            )}

            {isPayment && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation("/records-table")}
                className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                  isActive("/records-table")
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-[#2563EB]"
                }`}
              >
                <FaTableList className="text-2xl" />
                <span>Records Table</span>
              </motion.button>
            )}

            {/* distributors */}
            {isPayment && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation("/distributors")}
                className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                  isActive("/distributors")
                    ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-[#2563EB]"
                }`}
              >
                <FaPeopleGroup className="text-2xl" />
                <span>Distributors</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation("/transactions")}
              className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                isActive("/transactions")
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#2563EB]"
              }`}
            >
              <FaExchangeAlt className="text-2xl" />
              <span>Transactions</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation("/settings")}
              className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                isActive("/settings")
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#2563EB]"
              }`}
            >
              <FaCog className="text-2xl" />
              <span>Settings</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigation("/help")}
              className={`w-full flex items-center space-x-4 p-4 text-lg font-medium text-gray-100 rounded-xl transition-all duration-300 ${
                isActive("/help")
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#2563EB]"
              }`}
            >
              <FaQuestionCircle className="text-2xl" />
              <span>Help</span>
            </motion.button>
          </>
        )}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
