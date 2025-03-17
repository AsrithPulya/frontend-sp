import React, { useState, useEffect } from "react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Shared/Sidebar";

const Products = () => {
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
        { id: 4, name: "EDC Android", description: "Monthly Rental: 400+GST. Zero Rental if GMV 5 lakhs+. Setup fee: 99+GST. POS Commercials vary by card type." },
        { id: 5, name: "EDC Linux", description: "Monthly Rental: 300+GST - Linux Device. GMV Base 3 lakhs & Above: Zero Rental If not 300+GST" },
        { id: 6, name: "Analytical Reports", description: "Comprehensive business analytics" },
        { id: 7, name: "Payment Gateway & Net banking", description: "Secure online transactions.\n- Debit card above or below 2000\n- Credit Card Rate\n- International Cards\n- Prepaid/Corporate Cards" },
        { id: 8, name: "Payout Solutions", description: "Normal Payout, Bulk Payout" },
        { id: 9, name: "Multi-bank EMI", description: "3,6,9,12,18,24,36 Months plan. Commercials: 0.50%" },
        { id: 10, name: "Invoice Based Payments - UPI", description: "Efficient invoice-based payment system" },
        { id: 11, name: "SabbPe Loyalty Points", description: "Earn & Burn Points" },
        { id: 12, name: "Gift Vouchers", description: "Please refer to website: https://www.gyftr.com/ ; https://www.crafin.in/" },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-56" : "ml-16"
          } mt-16`} // Adjusted ml-64 to ml-56 to move content more to the left
        >
          <main className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Available Packages</h2>
              <p className="text-gray-600 text-lg">Discover powerful tools to grow your business seamlessly.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6 flex flex-col h-72"
                  >
                    <div className="flex flex-col flex-grow min-h-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      {unsubscribed[product.id - 1] ? (
                        <p className="text-gray-500 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Requires Approval
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm mb-2 flex items-center">
                          <span className="font-bold">Trial Transactions:</span> {getRandomTransactions()}
                          <svg
                            className="w-4 h-4 ml-1 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </p>
                      )}
                      <p className="text-gray-600 text-sm overflow-y-auto flex-grow min-h-0">{product.description}</p>
                    </div>
                    <div className="flex space-x-4 mt-4 justify-between items-center shrink-0">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnsubscribe(product.id);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Unsubscribe
                      </a>
                      {subscribed[product.id - 1] ? (
                        <span className="text-green-500 font-semibold text-sm">Subscribed</span>
                      ) : (
                        <button
                          onClick={() => handleSubscribe(product.id)}
                          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md text-sm"
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-lg">No products available at the moment.</p>
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

export default Products;