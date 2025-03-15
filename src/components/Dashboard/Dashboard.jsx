import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [earningsData, setEarningsData] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Generate random earnings data for 12 months
  useEffect(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const randomData = months.map((month) => ({
      month,
      earnings: Math.floor(Math.random() * (100000 - 20000 + 1)) + 20000,
    }));
    setEarningsData(randomData);
  }, []);

  const getRandomTransactions = () => Math.floor(Math.random() * 50) + 1;

  // const handleUnsubscribe = (productId) => {
  //   setUnsubscribed((prev) =>
  //     prev.map((status, index) => (index + 1 === productId ? true : status))
  //   );
  //   setSubscribed((prev) =>
  //     prev.map((status, index) => (index + 1 === productId ? false : status))
  //   );
  // };

  // const handleSubscribe = (productId) => {
  //   setUnsubscribed((prev) =>
  //     prev.map((status, index) => (index + 1 === productId ? false : status))
  //   );
  //   setSubscribed((prev) =>
  //     prev.map((status, index) => (index + 1 === productId ? true : status))
  //   );
  // };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 ml-0 md:ml-64 mt-16">
          <main className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 text-lg">Monitor your business performance and access key features.</p>
            </div>
            {/* Grid with four cards - reduced height from h-48 to h-40 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg p-4 h-40 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">SabbPe</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">2.5K</p>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg p-4 h-40 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">National Distributors</h3>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg p-4 h-40 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">Zonal Distributors</h3>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg p-4 h-40 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">Regional Distributors</h3>
              </div>
            </div>

            {/* Highlights and Earnings side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highlights Section - increased min-height from 200px to 300px */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 h-full min-h-[300px]">
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <p className="text-gray-600">All time sales for SabbPe</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">$295.7K</span>
                        <span className="text-green-600 text-sm">+2.7%</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                          <span className="text-gray-600">Sabbpe</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                          <span className="text-gray-600">National Distributors</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
                          <span className="text-gray-600">Zonal & Regional Distributors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings Section - increased min-height from 200px to 300px and chart height from 150 to 250 */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Earnings</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 text-sm">Referral only</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    <select className="border border-gray-300 rounded-md p-1 text-gray-600 text-sm">
                      <option>1 month</option>
                      <option>3 months</option>
                      <option>6 months</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 h-full min-h-[300px] flex items-center justify-center">
                  {/* Live Random Graph for SabbPe */}
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={earningsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis
                        stroke="#6b7280"
                        tickFormatter={(value) => `$${value / 1000}K`}
                        domain={[0, 100000]}
                      />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;