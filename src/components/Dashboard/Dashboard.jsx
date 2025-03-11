import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [unsubscribed, setUnsubscribed] = useState([]);
  const [subscribed, setSubscribed] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchProducts = async () => {
      const mockProducts = [
        { id: 1, name: "Static UPI", description: "UPI GMV cost is 0.05%. Static QR No. 1: No Charge. Additional QR: 99+GST" },
        { id: 2, name: "Soundbox", description: "Monthly Rental: 150+GST. One-time Setup fee: 100+GST" },
        { id: 3, name: "Dynamic QR - UPI", description: "Monthly Rental: 250+GST. One-time Setup fee: 100+GST" },
        { id: 4, name: "EDC Android", description: "Monthly Rental: 400+GST. Zero Rental if GMV 5 lakhs+. Setup fee: 99+GST." },
        { id: 5, name: "EDC Linux", description: "Monthly Rental: 300+GST - Linux Device. GMV Base 3 lakhs & Above: Zero Rental" },
        { id: 6, name: "Analytical Reports", description: "Comprehensive business analytics" },
        { id: 7, name: "Payment Gateway & Net banking", description: "Secure online transactions." },
        { id: 8, name: "Payout Solutions", description: "Normal Payout, Bulk Payout" },
        { id: 9, name: "Multi-bank EMI", description: "3,6,9,12,18,24,36 Months plan. Commercials: 0.50%" },
        { id: 10, name: "Invoice Based Payments - UPI", description: "Efficient invoice-based payment system" },
        { id: 11, name: "SabbPe Loyalty Points", description: "Earn & Burn Points" },
        { id: 12, name: "Gift Vouchers", description: "Please refer to website: https://www.gyftr.com/" },
        { id: 13, name: "Wallet", description: "Gold, Silver & Cash options available" }
      ];
      setProducts(mockProducts);
      setUnsubscribed(new Array(mockProducts.length).fill(false));
      setSubscribed(new Array(mockProducts.length).fill(false));
    };

    fetchProducts();
  }, []);

  const getRandomTransactions = () => Math.floor(Math.random() * 50) + 1;

  const handleUnsubscribe = (productId) => {
    setUnsubscribed((prev) =>
      prev.map((status, index) => (index + 1 === productId ? true : status))
    );
    setSubscribed((prev) =>
      prev.map((status, index) => (index + 1 === productId ? false : status))
    );
  };

  const handleSubscribe = (productId) => {
    setUnsubscribed((prev) =>
      prev.map((status, index) => (index + 1 === productId ? false : status))
    );
    setSubscribed((prev) =>
      prev.map((status, index) => (index + 1 === productId ? true : status))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar takes full height */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="h-screen" />
        
        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"} mt-16 p-4 md:p-6`}>
          <main>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Available Packages</h2>
              <p className="text-gray-600 text-sm md:text-base">Discover powerful tools to grow your business seamlessly.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-4 flex flex-col min-h-[200px]"
                  >
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      {unsubscribed[product.id - 1] ? (
                        <p className="text-gray-500 text-xs md:text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Requires Approval
                        </p>
                      ) : (
                        <p className="text-gray-500 text-xs md:text-sm mb-2 flex items-center">
                          <span className="font-bold">Trial Transactions:</span> {getRandomTransactions()}
                        </p>
                      )}
                      <p className="text-gray-600 text-xs md:text-sm overflow-hidden text-ellipsis">{product.description}</p>
                    </div>
                    <div className="flex space-x-2 mt-3 justify-between items-center">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnsubscribe(product.id);
                        }}
                        className="text-blue-600 hover:underline text-xs md:text-sm"
                      >
                        Unsubscribe
                      </a>
                      {subscribed[product.id - 1] ? (
                        <span className="text-green-500 font-semibold text-xs md:text-sm">Subscribed</span>
                      ) : (
                        <button
                          onClick={() => handleSubscribe(product.id)}
                          className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 text-xs md:text-sm"
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-base md:text-lg">No products available at the moment.</p>
                  <p className="text-gray-400">Check back later for exciting offers!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
