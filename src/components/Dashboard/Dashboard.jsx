import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Mock backend data fetch (replace with actual API call)
  useEffect(() => {
    const fetchProducts = async () => {
      // Simulate API call
      const mockProducts = [
        {
          id: 1,
          name: "Payment Gateway",
          description: "Secure online payment processing",
          price: "₹500/month",
          status: "Active",
          icon: "💳",
        },
        {
          id: 2,
          name: "QR Code Scanner",
          description: "Fast QR payment solution",
          price: "₹200/month",
          status: "Active",
          icon: "📱",
        },
        {
          id: 3,
          name: "POS Terminal",
          description: "Physical payment terminal",
          price: "₹1000 one-time",
          status: "Inactive",
          icon: "🖥️",
        },
      ];
      setProducts(mockProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar with full height */}
        <div className="h-screen">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Available Packages
            </h2>
            <p className="text-gray-600 text-lg">
              Discover powerful tools to grow your business seamlessly.
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Card Header with Icon */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center space-x-3">
                    <span className="text-3xl">{product.icon}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                    <p className="text-indigo-600 font-semibold text-lg mb-3">
                      {product.price}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-0">
                    <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">
                  No products available at the moment.
                </p>
                <p className="text-gray-400">
                  Check back later for exciting offers!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
