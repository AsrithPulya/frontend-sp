import React, { useState } from "react";

const BankDetails = ({ formData, setFormData, prevStep, nextStep }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, bankDocument: e.target.files[0] });
    setUploadStatus("Upload Successful");
  };

  const verifyBankDetails = async () => {
    try {
      // Mock API call for verification
      const response = await fetch("/api/verify-bank", {
        method: "POST",
        body: JSON.stringify({
          accountNumber: formData.accountNumber,
          ifsc: formData.ifsc,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setVerificationStatus("Successfully Verified");
        setIsVerified(true);
      } else {
        setVerificationStatus("Verification Failed. Please check your details.");
        setIsVerified(false);
      }
    } catch (error) {
      setVerificationStatus("Error verifying bank details. Try again.");
      setIsVerified(false);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-800">Bank Details</h4>

      {/* Bank Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bank Name
        </label>
        <select
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Bank</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="SBI">SBI</option>
          <option value="Canara">Canara</option>
        </select>
      </div>

      {/* Account Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Number
        </label>
        <input
          type="text"
          name="accountNumber"
          placeholder="Enter Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirm Account Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Account Number
        </label>
        <input
          type="text"
          name="confirmAccountNumber"
          placeholder="Re-enter Account Number"
          value={formData.confirmAccountNumber}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            formData.confirmAccountNumber &&
            formData.confirmAccountNumber !== formData.accountNumber
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formData.confirmAccountNumber &&
          formData.confirmAccountNumber !== formData.accountNumber && (
            <p className="text-red-500 text-sm mt-1">
              Account numbers do not match.
            </p>
          )}
      </div>

      {/* IFSC Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          IFSC Code
        </label>
        <input
          type="text"
          name="ifsc"
          placeholder="Enter IFSC Code"
          value={formData.ifsc}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Verify Button */}
      <button
        onClick={verifyBankDetails}
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 mb-3"
      >
        Verify Account
      </button>
      {verificationStatus && (
        <div
          className={`p-2 rounded-md text-sm ${
            isVerified
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {verificationStatus}
        </div>
      )}

      {/* Upload Cancelled Cheque / Bank Statement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Cancelled Cheque / Bank Statement
        </label>
        <input
          type="file"
          name="bankDocument"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {uploadStatus && (
        <div className="p-2 rounded-md text-sm bg-green-100 text-green-700">
          {uploadStatus}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="w-[120px] p-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="w-[120px] p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default BankDetails;