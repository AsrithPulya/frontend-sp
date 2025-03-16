import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
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
    <div className="flex-1 flex flex-col">
      {/* Navbar is in App.js */}
      <main className="p-6 md:p-8 ml-80" style={{ marginTop: "64px" }}>
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
          <p className="text-gray-600 text-lg">Monitor your business performance and access key features.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["SabbPe", "National Distributors", "Zonal Distributors", "Regional Distributors"].map((title, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl shadow-lg p-4 h-40 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold text-gray-900 text-center">{title}</h3>
              {title === "SabbPe" && <p className="text-3xl font-bold text-gray-900 mt-2">2.5K</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
            <div className="bg-white rounded-xl shadow-lg p-8 h-full min-h-[300px]">
              <p className="text-gray-600">All time sales for SabbPe</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">$295.7K</span>
                <span className="text-green-600 text-sm">+2.7%</span>
              </div>
              <div className="mt-4">
                {[["green", "SabbPe"], ["red", "National Distributors"], ["orange", "Zonal & Regional Distributors"]].map(([color, label], idx) => (
                  <div key={idx} className="flex items-center space-x-2 mt-2">
                    <span className={`w-4 h-4 bg-${color}-500 rounded-full`}></span>
                    <span className="text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Earnings</h3>
              <select className="border border-gray-300 rounded-md p-1 text-gray-600 text-sm">
                {["1 month", "3 months", "6 months", "1 year"].map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 h-full min-h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value / 1000}K`} domain={[0, 100000]} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;