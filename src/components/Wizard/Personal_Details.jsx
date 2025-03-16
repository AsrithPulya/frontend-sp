import React, { useEffect, useRef } from "react";

const PersonalDetails = ({ formData, setFormData, setStepComplete }) => {
  const [panStatus, setPanStatus] = React.useState(formData.panStatus || null);
  const [aadhaarStatus, setAadhaarStatus] = React.useState(formData.aadhaarStatus || null);

  const panFileInputRef = useRef(null);
  const aadhaarFileInputRef = useRef(null);

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      setPanStatus({ type: "danger", message: "Invalid PAN format." });
      setFormData((prev) => ({ ...prev, panVerified: false }));
      return false;
    }
    setPanStatus({ type: "success", message: "PAN Verified ✅" });
    setFormData((prev) => ({ ...prev, panVerified: true }));
    return true;
  };

  const validateAadhaar = (aadhaar) => {
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(aadhaar)) {
      setAadhaarStatus({ type: "danger", message: "Enter a valid 12-digit Aadhaar number" });
      setFormData((prev) => ({ ...prev, aadhaarVerified: false }));
      return false;
    }
    if (!formData.aadhaarConsent) {
      setAadhaarStatus({ type: "danger", message: "Please provide consent to validate Aadhaar" });
      setFormData((prev) => ({ ...prev, aadhaarVerified: false }));
      return false;
    }
    setAadhaarStatus({ type: "success", message: "Aadhaar Verified ✅" });
    setFormData((prev) => ({ ...prev, aadhaarVerified: true }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "pan" && { panVerified: false, panStatus: null }),
      ...(name === "aadhaar" && { aadhaarVerified: false, aadhaarStatus: null }),
    }));

    if (name === "pan") validatePAN(value);
    if (name === "aadhaar") validateAadhaar(value);
  };

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    } else {
      alert("File size must be under 2MB.");
    }
  };

  useEffect(() => {
    const requiredFields = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      dob: formData.dob,
      address1: formData.address1,
      address2: formData.address2,
      pan: formData.pan,
      aadhaar: formData.aadhaar,
      panFile: formData.panFile,
      aadhaarFront: formData.aadhaarFront,
    };

    const isFieldValid = (field) => {
      if (typeof field === "string") return field.trim() !== "";
      return field !== null;
    };

    const allFieldsFilled =
      Object.values(requiredFields).every(isFieldValid) &&
      formData.panVerified &&
      formData.aadhaarVerified &&
      formData.aadhaarConsent;

    setStepComplete(allFieldsFilled);
  }, [
    formData.fullName,
    formData.mobile,
    formData.email,
    formData.dob,
    formData.address1,
    formData.address2,
    formData.pan,
    formData.panVerified,
    formData.aadhaar,
    formData.aadhaarVerified,
    formData.aadhaarConsent,
    formData.panFile,
    formData.aadhaarFront,
    setStepComplete,
  ]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">Personal Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="+91"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
          />
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
          <label className="block text-base font-medium text-gray-700 mb-1">PAN Number</label>
          <div className="flex">
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              className="flex-1 p-4 text-base border border-gray-200 rounded-l-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
              placeholder="ABCDE1234F"
            />
            <button
              onClick={() => validatePAN(formData.pan)}
              disabled={formData.panVerified}
              className={`px-4 py-4 text-base bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-r-lg transition-all duration-300 ${
                formData.panVerified ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-blue-600"
              }`}
            >
              Verify
            </button>
          </div>
          {panStatus && (
            <p className={`mt-2 text-base ${panStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {panStatus.message}
            </p>
          )}
          <div className="mt-4">
            <label className="block text-base font-medium text-gray-700 mb-1">Upload PAN Card</label>
            <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => panFileInputRef.current.click()}
                className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Browse...
              </button>
              <span className="text-base text-gray-500">
                {formData.panFile ? formData.panFile.name : "No file selected"}
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={panFileInputRef}
                onChange={handleFileChange("panFile")}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Aadhaar Number</label>
          <div className="flex">
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className="flex-1 p-4 text-base border border-gray-200 rounded-l-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
              placeholder="XXXX XXXX XXXX"
            />
            <button
              onClick={() => validateAadhaar(formData.aadhaar)}
              disabled={!formData.aadhaarConsent || formData.aadhaarVerified}
              className={`px-4 py-4 text-base rounded-r-lg transition-all duration-300 ${
                formData.aadhaarConsent && !formData.aadhaarVerified
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </div>
          {aadhaarStatus && (
            <p className={`mt-2 text-base ${aadhaarStatus.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {aadhaarStatus.message}
            </p>
          )}
          <label className="flex items-center mt-3">
            <input
              type="checkbox"
              name="aadhaarConsent"
              checked={formData.aadhaarConsent}
              onChange={handleChange}
              className="mr-2 h-5 w-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400"
            />
            <span className="text-base text-gray-600">I give consent to validate my Aadhaar</span>
          </label>
          <div className="mt-4">
            <label className="block text-base font-medium text-gray-700 mb-1">Upload Aadhaar Front</label>
            <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => aadhaarFileInputRef.current.click()}
                className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Browse...
              </button>
              <span className="text-base text-gray-500">
                {formData.aadhaarFront ? formData.aadhaarFront.name : "No file selected"}
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={aadhaarFileInputRef}
                onChange={handleFileChange("aadhaarFront")}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;