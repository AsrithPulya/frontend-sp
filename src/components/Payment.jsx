import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import { motion } from "framer-motion";

const BankDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    bankName: "",
    amount: "",
    utrRef: "",
    file: null, // Stores the file URL after upload
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, file: null }));

    try {
      const fileUrl = await uploadDocument(file);
      setFormData((prev) => ({ ...prev, file: fileUrl }));
      setErrors((prev) => ({ ...prev, file: null }));
    } catch (error) {
      setErrors({ file: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.bankName) tempErrors.bankName = "Bank Name is required";
    if (!formData.amount) tempErrors.amount = "Amount is required";
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      tempErrors.amount = "Must be a positive number";
    if (!formData.utrRef) tempErrors.utrRef = "UTR/Ref No. is required";
    if (!formData.file) tempErrors.file = "Receipt is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const uploadDocument = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await fetch("http://test.sabbpe.com/docs/api/docupload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error(`Document upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.file_url) {
        throw new Error("No file_url returned from upload API");
      }
      return data.file_url;
    } catch (error) {
      throw new Error("Failed to upload document: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous API errors

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrors({ api: "Authentication token not found. Please log in again." });
        return;
      }

      const productsSelected = selectedProducts.map((p) => p.id).join(",");
      if (!productsSelected) {
        setErrors({ api: "No products selected" });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("bank_name", formData.bankName);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("utr_no", formData.utrRef);
      formDataToSend.append("statement_url", formData.file);
      formDataToSend.append("products_selected", productsSelected);

      // Log the data being sent for debugging
      console.log("Submitting form data:", {
        bank_name: formData.bankName,
        amount: formData.amount,
        utr_no: formData.utrRef,
        statement_url: formData.file,
        products_selected: productsSelected,
      });

      const response = await fetch("http://test.sabbpe.com/api/v1/profile/zonalpay", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data); // Log response for debugging

      if (data.code === 200) {
        navigate("/payment", {
          state: {
            selectedProducts,
            bankDetails: { ...formData, statement_url: formData.file },
          },
        });
      } else if (data.code === 201) {
        setErrors({ api: "Token expired or payment record not updated" });
        if (data.status && data.status.includes("Token expired")) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } else {
        setErrors({ api: `Unexpected response code: ${data.code}` });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ api: "An error occurred while updating payment details: " + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    return selectedProducts.length * 1000;
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
            className="w-full bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100"
            style={{ marginLeft: "-2rem" }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Payment Information
            </h2>

            {errors.api && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {errors.api}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedProducts.length > 0 && (
                <section>
                  <h3 className="text-xl font-medium text-gray-700 mb-4">
                    Selected Products
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-base text-gray-600 mb-3">
                      Items: {selectedProducts.length}
                    </p>
                    <ul className="list-disc list-inside text-base text-gray-600 mb-4 max-h-32 overflow-y-auto">
                      {selectedProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    </ul>
                    <p className="text-base text-gray-800 font-medium">
                      Estimated Total: ₹{calculateTotalAmount().toLocaleString()}
                    </p>
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-xl font-medium text-gray-700 mb-4">
                  Payment Details
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="bankName"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
                      placeholder="Enter bank name"
                      disabled={isLoading}
                    />
                    {errors.bankName && (
                      <p className="mt-2 text-sm text-red-600">{errors.bankName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
                      placeholder="Enter amount"
                      disabled={isLoading}
                    />
                    {errors.amount && (
                      <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="utrRef"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      UTR/Ref No.
                    </label>
                    <input
                      type="text"
                      id="utrRef"
                      name="utrRef"
                      value={formData.utrRef}
                      onChange={handleInputChange}
                      className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
                      placeholder="Enter UTR/Reference No."
                      disabled={isLoading}
                    />
                    {errors.utrRef && (
                      <p className="mt-2 text-sm text-red-600">{errors.utrRef}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="file"
                      className="block text-lg font-medium text-gray-700 mb-2"
                    >
                      Screenshot/Receipt
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="w-full p-3 text-base border border-gray-200 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-base file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-300 hover:shadow-md"
                      accept="image/*,.pdf"
                      disabled={isLoading}
                    />
                    {isLoading && !errors.file && (
                      <p className="mt-2 text-sm text-gray-600">Uploading file...</p>
                    )}
                    {formData.file && !errors.file && !isLoading && (
                      <p className="mt-2 text-sm text-green-600 truncate">
                        File uploaded successfully
                      </p>
                    )}
                    {errors.file && (
                      <p className="mt-2 text-sm text-red-600">{errors.file}</p>
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
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-base font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Proceed to Payment"}
                    </motion.button>
                  </div>
                </form>
              </section>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default BankDetails;