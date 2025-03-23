import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import { motion } from "framer-motion";

const CreateDistributor = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e) => {
    setMobileNumber(e.target.value);
    setErrors({}); // Clear errors on input change
  };

  const validateForm = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber) {
      setErrors({ mobile: "Mobile number is required" });
      return false;
    }
    if (!mobileRegex.test(mobileNumber)) {
      setErrors({ mobile: "Please enter a valid 10-digit mobile number" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrors({ api: "Authentication token not found. Please log in again." });
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/create-distributor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ mobile: mobileNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to create distributor");
      }

      const data = await response.json();
      navigate("/distributors", { state: { newDistributor: data } });
    } catch (error) {
      setErrors({ api: error.message || "Failed to create distributor" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(135deg, #F5F8FA 0%, #E6F0FA 100%)",
      }}
    >
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 flex flex-col p-8 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
          style={{ marginTop: "64px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Create New Distributor
            </h2>

            {errors.api && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {errors.api}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={handleInputChange}
                  className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 text-base font-medium rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-base font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Distributor"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CreateDistributor;