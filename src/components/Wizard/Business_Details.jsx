import React, { useEffect, useRef } from "react";

const BusinessDetails = ({ formData, setFormData, setStepComplete }) => {
  const [firmPanStatus, setFirmPanStatus] = React.useState(formData.firmPanStatus || null);
  const [gstStatus, setGstStatus] = React.useState(formData.gstStatus || null);

  const firmPanFileInputRef = useRef(null);
  const businessRegistrationFileInputRef = useRef(null);
  const addressProofFileInputRef = useRef(null);

  // Validation functions
  const validateFirmPAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pan || !panRegex.test(pan)) {
      setFirmPanStatus({ type: "danger", message: "Invalid PAN format." });
      setFormData((prev) => ({ ...prev, firmPanVerified: false }));
      return false;
    }
    setFirmPanStatus({ type: "success", message: "Firm PAN Verified ✅" });
    setFormData((prev) => ({ ...prev, firmPanVerified: true }));
    return true;
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gst || !gstRegex.test(gst)) {
      setGstStatus({ type: "danger", message: "Invalid GST format." });
      setFormData((prev) => ({ ...prev, gstVerified: false }));
      return false;
    }
    setGstStatus({ type: "success", message: "GST Verified ✅" });
    setFormData((prev) => ({ ...prev, gstVerified: true }));
    return true;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
        ...(name === "firmPanNumber" && { firmPanVerified: false, firmPanStatus: null }),
        ...(name === "gstNumber" && { gstVerified: false, gstStatus: null }),
      };
      console.log(`Updated formData for ${name}:`, newFormData);
      return newFormData;
    });

    if (name === "firmPanNumber") validateFirmPAN(value);
    if (name === "gstNumber") validateGST(value);
  };

  // Handle file uploads
  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData((prev) => {
        const newFormData = { ...prev, [fieldName]: file };
        console.log(`File uploaded for ${fieldName}:`, file);
        return newFormData;
      });
    } else {
      alert("File size must be under 2MB.");
    }
  };

  // Check step completion with detailed logging
  useEffect(() => {
    const requiredFields = {
      businessName: formData.businessName,
      businessType: formData.businessType,
      address1: formData.address1,
      address2: formData.address2,
      firmPanNumber: formData.firmPanNumber,
      gstNumber: formData.gstNumber,
      firmPanFile: formData.firmPanFile,
      businessRegistrationFile: formData.businessRegistrationFile,
      addressProofFile: formData.addressProofFile,
    };

    const isFieldValid = (field, fieldName) => {
      if (typeof field === "string") {
        const isValid = field.trim() !== "";
        console.log(`${fieldName}: "${field}" -> ${isValid ? "Valid" : "Invalid (empty)"}`);
        return isValid;
      }
      const isValid = field !== null && field !== undefined;
      console.log(`${fieldName}: ${field ? field.name : "null/undefined"} -> ${isValid ? "Valid" : "Invalid"}`);
      return isValid;
    };

    const fieldValidationResults = Object.entries(requiredFields).map(([key, value]) =>
      isFieldValid(value, key)
    );
    const allFieldsValid = fieldValidationResults.every((result) => result);
    const isVerified = formData.firmPanVerified && formData.gstVerified;

    console.log("Field Validation Results:", fieldValidationResults);
    console.log("All Fields Valid:", allFieldsValid);
    console.log("Verification Status:", {
      firmPanVerified: formData.firmPanVerified,
      gstVerified: formData.gstVerified,
    });
    const allFieldsFilled = allFieldsValid && isVerified;
    console.log("Step Complete (allFieldsFilled):", allFieldsFilled);

    setStepComplete(allFieldsFilled);
  }, [
    formData.businessName,
    formData.businessType,
    formData.address1,
    formData.address2,
    formData.firmPanNumber,
    formData.firmPanVerified,
    formData.gstNumber,
    formData.gstVerified,
    formData.firmPanFile,
    formData.businessRegistrationFile,
    formData.addressProofFile,
    setStepComplete,
  ]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">Business Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Enter business name"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
          >
            <option value="">Select Business Type</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Private Limited">Private Limited</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Address Line 1</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Street address"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Address Line 2</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Apartment, suite, etc."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Firm PAN Number</label>
          <div className="flex">
            <input
              type="text"
              name="firmPanNumber"
              value={formData.firmPanNumber}
              onChange={handleChange}
              className="flex-1 p-4 text-base border border-gray-200 rounded-l-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
              placeholder="ABCDE1234F"
            />
            <button
              onClick={() => validateFirmPAN(formData.firmPanNumber)}
              disabled={formData.firmPanVerified}
              className={`px-4 py-4 text-base bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-r-lg transition-all duration-300 ${
                formData.firmPanVerified ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-blue-600"
              }`}
            >
              Verify
            </button>
          </div>
          {firmPanStatus && (
            <p className={`mt-2 text-base ${firmPanStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {firmPanStatus.message}
            </p>
          )}
          <div className="mt-4">
            <label className="block text-base font-medium text-gray-700 mb-1">Upload Firm PAN Card</label>
            <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => firmPanFileInputRef.current.click()}
                className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Browse...
              </button>
              <span className="text-base text-gray-500">
                {formData.firmPanFile ? formData.firmPanFile.name : "No file selected"}
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={firmPanFileInputRef}
                onChange={handleFileChange("firmPanFile")}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">GST Number</label>
          <div className="flex">
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="flex-1 p-4 text-base border border-gray-200 rounded-l-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
              placeholder="22ABCDE1234F1Z5"
            />
            <button
              onClick={() => validateGST(formData.gstNumber)}
              disabled={formData.gstVerified}
              className={`px-4 py-4 text-base bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-r-lg transition-all duration-300 ${
                formData.gstVerified ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-blue-600"
              }`}
            >
              Verify
            </button>
          </div>
          {gstStatus && (
            <p className={`mt-2 text-base ${gstStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {gstStatus.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Business Registration Certificate</label>
          <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => businessRegistrationFileInputRef.current.click()}
              className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Browse...
            </button>
            <span className="text-base text-gray-500">
              {formData.businessRegistrationFile ? formData.businessRegistrationFile.name : "No file selected"}
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              ref={businessRegistrationFileInputRef}
              onChange={handleFileChange("businessRegistrationFile")}
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Business Address Proof</label>
          <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => addressProofFileInputRef.current.click()}
              className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Browse...
            </button>
            <span className="text-base text-gray-500">
              {formData.addressProofFile ? formData.addressProofFile.name : "No file selected"}
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              ref={addressProofFileInputRef}
              onChange={handleFileChange("addressProofFile")}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;