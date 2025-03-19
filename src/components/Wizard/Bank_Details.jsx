import React, { useEffect, useRef, useState } from "react";

const BankDetails = ({ formData, setFormData, setStepComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState(() => {
    // Initialize from localStorage if available
    const savedDocs = localStorage.getItem('uploadedDocs');
    return savedDocs ? JSON.parse(savedDocs) : {};
  });
  const prevCompleteRef = useRef(false); // Track previous completion status

  const bankFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, bankVerified: false }));
  };

  const handleFileChange = (fieldName) => async (e) => {
    const file = e.target.files[0];
    
    if (file && file.size <= 2 * 1024 * 1024) {
      // Update formData with the selected file
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      
      // Prepare form data for API
      const uploadData = new FormData();
      uploadData.append('file', file);

      // Commented out API call for file upload (bypassed for testing)
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
          setUploadStatus("Upload Successful");
        } else {
          alert(result.message || 'File upload failed');
          setUploadStatus("File upload failed");
          // Clear the file input if upload fails
          setFormData((prev) => ({ ...prev, [fieldName]: null }));
          if (bankFileInputRef.current) {
            bankFileInputRef.current.value = '';
          }
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('An error occurred while uploading the file');
        setUploadStatus("Upload failed due to an error");
        setFormData((prev) => ({ ...prev, [fieldName]: null }));
        if (bankFileInputRef.current) {
          bankFileInputRef.current.value = '';
        }
      }
    

      // Simulated successful file upload for testing
      // setUploadedDocs((prev) => ({
      //   ...prev,
      //   [fieldName]: `https://example.com/test_${fieldName}.pdf` // Dummy URL
      // }));
      // setUploadStatus("Upload Successful (Test Mode)");

    } else {
      setUploadStatus("File size must be under 2MB.");
      if (bankFileInputRef.current) {
        bankFileInputRef.current.value = '';
      }
    }
  };

  const verifyBankDetails = async () => {
    try {
      const isValidAccount = /^[0-9]{9,18}$/.test(formData.accountNumber);
      const isValidIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc);
      if (!isValidAccount || !isValidIFSC || formData.accountNumber !== formData.confirmAccountNumber) {
        setVerificationStatus("❌ Invalid Account Number, IFSC Code, or Confirmation Mismatch");
        setFormData((prev) => ({ ...prev, bankVerified: false }));
        return;
      }

      // Commented out API call for bank verification (bypassed for testing)
      
      const formDataToSend = new FormData();
      formDataToSend.append("account_no", formData.accountNumber);
      formDataToSend.append("ifsc_code", formData.ifsc);

      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/http://test.sabbpe.com/api/v1/zoop/bankaccountverify",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok || result.code === 100) {
        setVerificationStatus("✅ " + (result.response_message || "Bank Account Verified"));
        setFormData((prev) => ({ ...prev, bankVerified: true }));
      } else {
        setVerificationStatus("❌ " + (result.response_message || "Bank verification failed"));
        setFormData((prev) => ({ ...prev, bankVerified: false }));
      }
      

      // Simulated successful verification for testing
      // setVerificationStatus("✅ Bank Account Verified (Test Mode)");
      // setFormData((prev) => ({ ...prev, bankVerified: true }));

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

    if (allFieldsFilled !== prevCompleteRef.current) {
      setStepComplete(allFieldsFilled);
      prevCompleteRef.current = allFieldsFilled;
    }
  }, [
    formData.bankName,
    formData.accountNumber,
    formData.confirmAccountNumber,
    formData.ifsc,
    formData.bankDocument,
    formData.bankVerified,
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
        <label className="block text-base font-medium text-gray-700 mb-1">
          Upload Cancelled Cheque / Bank Statement
        </label>
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
      {uploadStatus && (
        <p className={`mt-2 text-base ${uploadStatus.includes("failed") ? "text-red-600" : "text-green-600"}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default BankDetails;