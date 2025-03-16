import React, { useEffect, useRef } from "react";

const BankDetails = ({ formData, setFormData, setStepComplete }) => {
  const [verificationStatus, setVerificationStatus] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState(null);

  const bankFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, bankVerified: false }));
  };

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setUploadStatus("Upload Successful");
    } else {
      setUploadStatus("File size must be under 2MB.");
    }
  };

  const verifyBankDetails = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isValidAccount = /^[0-9]{9,18}$/.test(formData.accountNumber);
      const isValidIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc);
      if (isValidAccount && isValidIFSC && formData.accountNumber === formData.confirmAccountNumber) {
        setVerificationStatus("✅ Successfully Verified");
        setFormData((prev) => ({ ...prev, bankVerified: true }));
      } else {
        setVerificationStatus("❌ Invalid Account Number, IFSC Code, or Confirmation Mismatch");
        setFormData((prev) => ({ ...prev, bankVerified: false }));
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setVerificationStatus("⚠️ Error verifying bank details. Try again.");
      setFormData((prev) => ({ ...prev, bankVerified: false }));
    }
  };

  useEffect(() => {
    const requiredFields = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      confirmAccountNumber: formData.confirmAccountNumber,
      ifsc: formData.ifsc,
      bankDocument: formData.bankDocument,
    };

    const isFieldValid = (field) => {
      if (typeof field === "string") return field.trim() !== "";
      return field !== null;
    };

    const allFieldsFilled =
      Object.values(requiredFields).every(isFieldValid) &&
      formData.accountNumber === formData.confirmAccountNumber &&
      formData.bankVerified;

    setStepComplete(allFieldsFilled);
  }, [
    formData.bankName,
    formData.accountNumber,
    formData.confirmAccountNumber,
    formData.ifsc,
    formData.bankDocument,
    formData.bankVerified,
    setStepComplete,
  ]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Bank Name</label>
          <select
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
          >
            <option value="">Select Bank</option>
            <option value="HDFC">HDFC</option>
            <option value="ICICI">ICICI</option>
            <option value="SBI">SBI</option>
            <option value="Canara">Canara</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Enter account number"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Confirm Account Number</label>
          <input
            type="text"
            name="confirmAccountNumber"
            value={formData.confirmAccountNumber}
            onChange={handleChange}
            className={`w-full p-4 text-base border rounded-lg shadow-sm focus:ring-2 transition-all duration-300 hover:shadow-md ${
              formData.confirmAccountNumber && formData.confirmAccountNumber !== formData.accountNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:ring-indigo-400 focus:border-indigo-500"
            }`}
            placeholder="Re-enter account number"
          />
          {formData.confirmAccountNumber && formData.confirmAccountNumber !== formData.accountNumber && (
            <p className="text-red-500 text-base mt-2">Account numbers do not match.</p>
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            className="w-full p-4 text-base border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-300 hover:shadow-md"
            placeholder="Enter IFSC code"
          />
        </div>
      </div>
      <button
        onClick={verifyBankDetails}
        className="w-full p-4 text-base bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
      >
        Verify Account
      </button>
      {verificationStatus && (
        <p className={`mt-2 text-base ${formData.bankVerified ? "text-green-600" : "text-red-600"}`}>
          {verificationStatus}
        </p>
      )}
      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">Upload Cancelled Cheque / Bank Statement</label>
        <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => bankFileInputRef.current.click()}
            className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            Browse...
          </button>
          <span className="text-base text-gray-500">
            {formData.bankDocument ? formData.bankDocument.name : "No file selected"}
          </span>
          <input
            type="file"
            name="bankDocument"
            accept="image/png, image/jpeg, application/pdf"
            ref={bankFileInputRef}
            onChange={handleFileChange("bankDocument")}
            className="hidden"
          />
        </div>
      </div>
      {uploadStatus && <p className="mt-2 text-base text-green-600">{uploadStatus}</p>}
    </div>
  );
};

export default BankDetails;