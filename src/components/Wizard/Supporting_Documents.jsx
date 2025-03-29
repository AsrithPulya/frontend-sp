import React, { useEffect, useRef, useState } from "react";

const SupportingDocuments = ({ formData, setFormData, setStepComplete ,stepComplete}) => {
  const prevCompleteRef = useRef(false);
  const fileInputRef = useRef(null);
  const [documentList, setDocumentList] = useState([]);

  // Fetch documents from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("submissionData")) || {};
    const documents = [
      { name: "Aadhaar Card (Front)", url: storedData.aadhaarFront, verifyStatus: storedData.aadhaarVerifyStatus },
      { name: "Business Address Proof", url: storedData.addressProofFile, verifyStatus: storedData.businessAddressVerifyStatus },
      { name: "Bank Document", url: storedData.bankDocument, verifyStatus: storedData.bankVerifyStatus },
      { name: "Business Registration Certificate", url: storedData.businessRegistrationFile, verifyStatus: storedData.gstVerifyStatus },
      { name: "Firm PAN Card", url: storedData.firmPanFile, verifyStatus: storedData.firmPanVerifyStatus },
      { name: "PAN Card", url: storedData.panFile, verifyStatus: storedData.panVerifyStatus },
    ].filter(doc => doc.url); // Only include documents with URLs
    setDocumentList(documents);
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isSizeValid = file.size <= 2 * 1024 * 1024;
      const isFormatValid = ["image/png", "image/jpeg", "application/pdf"].includes(file.type);
      if (!isSizeValid) alert(`File ${file.name} exceeds 2MB limit.`);
      if (!isFormatValid) alert(`File ${file.name} is not a valid format (PNG, JPEG, PDF).`);
      return isSizeValid && isFormatValid;
    });

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        uploadedDocuments: [...prev.uploadedDocuments, ...validFiles],
      }));
    }
  };

  const getDocumentStatus = (doc) => {
    if (!doc.url) {
      return { status: "Not Uploaded", color: "bg-red-100 text-red-800" };
    }
    
    const statusMap = {
      1: { status: "Online Verified", color: "bg-green-100 text-green-800" },
      0: { status: "Verification in Progress", color: "bg-yellow-100 text-yellow-800" },
    };
    
    return statusMap[doc.verifyStatus] || { status: "Uploaded", color: "bg-gray-100 text-gray-800" };
  };

  console.log(documentList)

  useEffect(() => {
    // Enable submit button only if there are documents in localStorage
    const hasDocuments = documentList.length > 0;
    
    if (hasDocuments !== prevCompleteRef.current) {
      setStepComplete(4,hasDocuments); // True only if documents exist in localStorage
      prevCompleteRef.current = hasDocuments;
    }
  }, [documentList, formData.uploadedDocuments, setStepComplete]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">Supporting Documents</h2>
      <div>
        <div className="space-y-4">
          {documentList.map((doc, index) => {
            const { status, color } = getDocumentStatus(doc);
            return (
              <div key={index} className="flex items-center justify-between">
                <span className="text-base text-gray-700">{doc.name}</span>
                <span className={`px-3 py-1 text-base rounded-full ${color}`}>{status}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <label className="block text-base font-medium text-gray-700 mb-1">Upload Additional Documents</label>
          <p className="text-sm text-gray-500 mb-2">Accepted formats: PNG, JPEG, PDF | Max size: 2MB</p>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Choose Files
            </button>
            <span className="text-base text-gray-500">
              {formData.uploadedDocuments.length > 0
                ? `${formData.uploadedDocuments.length} file(s) selected`
                : "No files selected"}
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
          </div>
          {formData.uploadedDocuments.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.uploadedDocuments.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-base text-gray-700">{file.name}</span>
                  <span className="px-3 py-1 text-base rounded-full bg-gray-100 text-gray-800">Uploaded</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportingDocuments;