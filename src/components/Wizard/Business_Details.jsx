import React, { useEffect } from "react";

const BusinessDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] || null });
  };

  // PAN and GST validation
  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const validateGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);

  // Check if form is valid
  const isFormValid =
    formData.businessName?.trim() &&
    formData.businessType?.trim() &&
    validatePAN(formData.firmPanNumber) &&
    validateGST(formData.gstNumber) &&
    formData.firmPanFile instanceof File &&
    formData.businessRegFile instanceof File &&
    formData.businessAddressProof instanceof File;

  // Debugging: Log form data
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-800">Business Details</h4>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <input
          type="text"
          name="businessName"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Entity Type
        </label>
        <select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Entity Type</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="Partnership">Partnership</option>
          <option value="Private Limited">Private Limited</option>
        </select>
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Address
        </label>
        <input
          type="text"
          name="businessAddress"
          placeholder="Enter your business address"
          value={formData.businessAddress}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Firm PAN Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Firm PAN Number
        </label>
        <input
          type="text"
          name="firmPanNumber"
          placeholder="Enter your Firm PAN Number"
          value={formData.firmPanNumber}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            formData.firmPanNumber && !validatePAN(formData.firmPanNumber)
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formData.firmPanNumber && !validatePAN(formData.firmPanNumber) && (
          <p className="text-red-500 text-sm mt-1">
            Invalid PAN format. Example: ABCDE1234F
          </p>
        )}
      </div>

      {/* GST Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GST Number
        </label>
        <input
          type="text"
          name="gstNumber"
          placeholder="Enter your GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            formData.gstNumber && !validateGST(formData.gstNumber)
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formData.gstNumber && !validateGST(formData.gstNumber) && (
          <p className="text-red-500 text-sm mt-1">Invalid GST format.</p>
        )}
      </div>

      {/* Upload PAN Verification File */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload PAN Verification File
        </label>
        <input
          type="file"
          name="firmPanFile"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Business Registration Certificate Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Business Registration Certificate
        </label>
        <input
          type="file"
          name="businessRegFile"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Business Address Proof Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Business Address Proof
        </label>
        <input
          type="file"
          name="businessAddressProof"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          disabled={!isFormValid}
          className={`w-[120px] p-2 bg-blue-500 text-white font-semibold rounded-md transition duration-200 ${
            isFormValid ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default BusinessDetails;
