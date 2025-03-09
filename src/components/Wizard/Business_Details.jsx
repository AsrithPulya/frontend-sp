import React from "react";

const BusinessDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, firmPanFile: e.target.files[0] });
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const isFormValid =
    formData.businessName &&
    formData.businessType &&
    formData.businessAddress &&
    validatePAN(formData.firmPanNumber) &&
    formData.firmPanFile;

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
          Business Type
        </label>
        <select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Business Type</option>
          <option value="GST">GST</option>
          <option value="MSME">MSME</option>
        </select>
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Address
        </label>
        <textarea
          name="businessAddress"
          placeholder="Enter your business address"
          rows={3}
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