import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const Dashboard = ({ isSidebarOpen, toggleSidebar }) => {
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    console.log("Dashboard component mounted");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const randomData = months.map((month) => ({
      month,
      earnings: Math.floor(Math.random() * (100000 - 20000 + 1)) + 20000,
    }));
    setEarningsData(randomData);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 font-inter">
      <main
        className={`p-6 md:p-10 transition-all duration-500 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
        style={{ marginTop: "80px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Welcome to Your Dashboard
          </h2>
          <p className="text-lg text-gray-600 tracking-wide">
            Monitor your business performance with real-time insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          {["SabbPe", "National Distributors", "Zonal Distributors", "Regional Distributors"].map((title, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-100 hover:shadow-xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.7))",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              {title === "SabbPe" && (
                <div className="flex items-center mt-3">
                  <p className="text-4xl font-bold text-emerald-600">2.5K</p>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 text-emerald-600 text-lg font-medium"
                  >
                    ↑ 2.7%
                  </motion.span>
                </div>
              )}
              {title !== "SabbPe" && (
                <p className="text-lg text-gray-600 mt-2">{Math.floor(Math.random() * 1000)} Units</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Highlights</h3>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 min-h-[300px] backdrop-blur-sm">
              <p className="text-gray-600 text-sm">All time sales for SabbPe</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-4xl font-bold text-indigo-800">$295.7K</span>
                <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-full">
                  +2.7%
                </span>
              </div>
              <div className="mt-6">
                {[["emerald", "SabbPe"], ["red", "National Distributors"], ["orange", "Zonal & Regional Distributors"]].map(
                  ([color, label], idx) => (
                    <div key={idx} className="flex items-center space-x-3 mt-3">
                      <span className={`w-4 h-4 bg-${color}-500 rounded-full shadow-md`}></span>
                      <span className="text-gray-600 text-sm font-medium">{label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">Earnings</h3>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm bg-white hover:border-indigo-500 transition-all shadow-sm">
                {["1 month", "3 months", "6 months", "1 year"].map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 min-h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis
                    stroke="#6b7280"
                    tickFormatter={(value) => `$${value / 1000}K`}
                    domain={[0, 100000]}
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(value) => `$${value}`}
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#1E3A8A"
                    strokeWidth={3}
                    dot={false}
                    strokeOpacity={0.9}
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;