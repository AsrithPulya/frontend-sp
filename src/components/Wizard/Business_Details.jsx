import React, { useEffect, useRef, useState } from "react";

const BusinessDetails = ({ formData, setFormData, setStepComplete }) => {
  const [firmPanStatus, setFirmPanStatus] = useState(formData.firmPanStatus || null);
  const [gstStatus, setGstStatus] = useState(formData.gstStatus || null);
  const [uploadedDocs, setUploadedDocs] = useState(() => {
    // Initialize from localStorage if available
    const savedDocs = localStorage.getItem('uploadedDocs');
    return savedDocs ? JSON.parse(savedDocs) : {};
  });
  const prevCompleteRef = useRef(false); // Track previous completion status

  const firmPanFileInputRef = useRef(null);
  const businessRegistrationFileInputRef = useRef(null);
  const addressProofFileInputRef = useRef(null);

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

  const validateGSTFormat = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gst && gstRegex.test(gst);
  };

  const verifyGSTWithAPI = async (gst) => {
    try {

      const formDataToSend = new FormData();
      formDataToSend.append("gst_number", gst);

      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/http://test.sabbpe.com/api/v1/zoop/getgstverify",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok && result.code === 100) {
        setGstStatus({ type: "success", message: result.response_message || "GST Verified ✅" });
        setFormData((prev) => ({ ...prev, gstVerified: true }));
        return true;
      } else {
        setGstStatus({
          type: "danger",
          message: result.response_message || "GST verification failed",
        });
        setFormData((prev) => ({ ...prev, gstVerified: false }));
        return false;
      }
    } catch (error) {
      setGstStatus({
        type: "danger",
        message: "Error verifying GST. Please try again.",
      });
      setFormData((prev) => ({ ...prev, gstVerified: false }));
      return false;
    }
  };

  const validateGST = async (gst) => {
    if (!validateGSTFormat(gst)) {
      setGstStatus({ type: "danger", message: "Invalid GST format." });
      setFormData((prev) => ({ ...prev, gstVerified: false }));
      return false;
    }
    return await verifyGSTWithAPI(gst);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "firmPanNumber" && { firmPanVerified: false, firmPanStatus: null }),
      ...(name === "gstNumber" && { gstVerified: false, gstStatus: null }),
    }));

    if (name === "firmPanNumber") validateFirmPAN(value);
    if (name === "gstNumber") await validateGST(value);
  };

  const handleFileChange = (fieldName) => async (e) => {
    const file = e.target.files[0];
    
    if (file && file.size <= 2 * 1024 * 1024) {
      // Update formData with the selected file
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      
      // Prepare form data for API
      const uploadData = new FormData();
      uploadData.append('file', file);

      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/http://test.sabbpe.com/docs/api/docupload', {
          method: 'POST',
          body: uploadData,
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
          // Store the uploaded file URL with document type
          setUploadedDocs((prev) => {
            const newDocs = {
              ...prev,
              [fieldName]: result.file_url
            };
            // Save to localStorage
            localStorage.setItem('uploadedDocs', JSON.stringify(newDocs));
            return newDocs;
          });
        } else {
          alert(result.message || 'File upload failed');
          // Clear the file input if upload fails
          setFormData((prev) => ({ ...prev, [fieldName]: null }));
          if (fieldName === 'firmPanFile' && firmPanFileInputRef.current) {
            firmPanFileInputRef.current.value = '';
          }
          if (fieldName === 'businessRegistrationFile' && businessRegistrationFileInputRef.current) {
            businessRegistrationFileInputRef.current.value = '';
          }
          if (fieldName === 'addressProofFile' && addressProofFileInputRef.current) {
            addressProofFileInputRef.current.value = '';
          }
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('An error occurred while uploading the file');
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        if (fieldName === 'firmPanFile' && firmPanFileInputRef.current) {
          firmPanFileInputRef.current.value = '';
        }
        if (fieldName === 'businessRegistrationFile' && businessRegistrationFileInputRef.current) {
          businessRegistrationFileInputRef.current.value = '';
        }
        if (fieldName === 'addressProofFile' && addressProofFileInputRef.current) {
          addressProofFileInputRef.current.value = '';
        }
      }
    } else {
      alert("File size must be under 2MB.");
      if (fieldName === 'firmPanFile' && firmPanFileInputRef.current) {
        firmPanFileInputRef.current.value = '';
      }
      if (fieldName === 'businessRegistrationFile' && businessRegistrationFileInputRef.current) {
        businessRegistrationFileInputRef.current.value = '';
      }
      if (fieldName === 'addressProofFile' && addressProofFileInputRef.current) {
        addressProofFileInputRef.current.value = '';
      }
    }
  };

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

    const isFieldValid = (field) => {
      if (typeof field === "string") return field.trim() !== "";
      return field !== null && field !== undefined;
    };

    const allFieldsValid = Object.values(requiredFields).every(isFieldValid);
    const isVerified = formData.firmPanVerified && formData.gstVerified;
    const allFieldsFilled = allFieldsValid && isVerified;

    if (allFieldsFilled !== prevCompleteRef.current) {
      setStepComplete(allFieldsFilled);
      prevCompleteRef.current = allFieldsFilled;
    }
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