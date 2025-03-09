import React, { useState, useEffect } from "react";

const PersonalDetails = ({ formData, setFormData, nextStep }) => {
  const [panStatus, setPanStatus] = useState(null);
  const [aadhaarStatus, setAadhaarStatus] = useState(null);
  const [aadhaarConsent, setAadhaarConsent] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      formData.fullName &&
      formData.mobile &&
      formData.email &&
      formData.dob &&
      formData.address &&
      formData.pan &&
      formData.aadhaar &&
      panStatus?.type === "success" &&
      aadhaarStatus?.type === "success" &&
      aadhaarConsent &&
      panFile &&
      aadhaarFront &&
      aadhaarBack;

    setNextEnabled(allFieldsFilled);
  }, [
    formData,
    panStatus,
    aadhaarStatus,
    aadhaarConsent,
    panFile,
    aadhaarFront,
    aadhaarBack,
  ]);

  // PAN Validation
  const validatePAN = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      setPanStatus({
        type: "danger",
        message: "Invalid PAN format. Please enter a valid PAN.",
      });
      return;
    }
    setTimeout(() => {
      setPanStatus({ type: "success", message: "PAN Verified ✅" });
    }, 1500);
  };

  // Aadhaar Validation
  const validateAadhaar = () => {
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.aadhaar)) {
      setAadhaarStatus({
        type: "danger",
        message: "Enter a valid 12-digit Aadhaar number",
      });
      return;
    }
    if (!aadhaarConsent) {
      setAadhaarStatus({
        type: "danger",
        message: "Please provide consent to validate Aadhaar",
      });
      return;
    }
    setTimeout(() => {
      setAadhaarStatus({ type: "success", message: "Aadhaar Verified ✅" });
    }, 1500);
  };

  const handleNext = () => {
    setShowConfirmation(true);
  };

  const confirmAndProceed = () => {
    setShowConfirmation(false);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Personal Details
      </h3>

      {/* Row 1: Full Name and Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="+91"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Row 2: Email and DOB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          rows={2}
          placeholder="Enter your address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Row 3: PAN and Aadhaar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PAN Number
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={(e) =>
                setFormData({ ...formData, pan: e.target.value })
              }
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={validatePAN}
              className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-r-md hover:bg-blue-50 transition duration-200"
            >
              Verify PAN
            </button>
          </div>
          {panStatus && (
            <div
              className={`mt-2 p-2 rounded-md text-sm ${
                panStatus.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {panStatus.message}
            </div>
          )}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
            Upload PAN Card
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPanFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Number
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="XXXX XXXX XXXX"
              value={formData.aadhaar}
              onChange={(e) =>
                setFormData({ ...formData, aadhaar: e.target.value })
              }
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={validateAadhaar}
              disabled={!aadhaarConsent}
              className={`px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-r-md transition duration-200 ${
                aadhaarConsent
                  ? "hover:bg-blue-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Validate Aadhaar
            </button>
          </div>
          {aadhaarStatus && (
            <div
              className={`mt-2 p-2 rounded-md text-sm ${
                aadhaarStatus.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {aadhaarStatus.message}
            </div>
          )}
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={aadhaarConsent}
              onChange={(e) => setAadhaarConsent(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I give consent to validate my Aadhaar
            </span>
          </label>
        </div>
      </div>

      {/* Row 4: Aadhaar Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Aadhaar Front
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAadhaarFront(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Aadhaar Back
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAadhaarBack(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!nextEnabled}
          className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-md transition duration-200 ${
            nextEnabled
              ? "hover:bg-blue-600"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Confirm Your Details
              </h4>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure all the details entered are correct?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAndProceed}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Confirm & Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;