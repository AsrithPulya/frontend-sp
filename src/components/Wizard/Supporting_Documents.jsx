import React, { useState } from "react";

const SupportingDocuments = ({ prevStep }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const documentsList = [
    { name: "Business address proof", status: "in-progress" },
    { name: "Settlement bank account details", status: "verified" },
    { name: "PAN Card", status: "in-progress" },
    { name: "Personal address proof", status: "in-progress" },
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      name: file.name,
      status: "uploaded",
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-3">
        Supporting Documents
      </h4>

      {/* Document List */}
      <div className="space-y-2">
        {documentsList.map((doc, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-white border border-gray-200 rounded-md"
          >
            <span
              className={`mr-2 ${
                doc.status === "verified" ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {doc.status === "verified" ? "✅" : "⚠️"}
            </span>
            <span className="text-gray-700">
              {doc.name} -{" "}
              {doc.status === "verified"
                ? "Online Verified"
                : "Verification in Progress"}
            </span>
          </div>
        ))}

        {/* Display uploaded files */}
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-white border border-gray-200 rounded-md text-blue-600"
          >
            <span className="mr-2">📄</span>
            <span>{file.name} - Uploaded</span>
          </div>
        ))}
      </div>

      {/* Upload Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Additional Documents
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-3">
        <button
          onClick={prevStep}
          className="w-[120px] p-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
        <button className="w-[120px] p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
          Submit Documents
        </button>
      </div>
    </div>
  );
};

export default SupportingDocuments;