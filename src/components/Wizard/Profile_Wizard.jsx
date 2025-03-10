import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import PersonalDetails from "./Personal_Details";
import BusinessDetails from "./Business_Details";
import BankDetails from "./Bank_Details";
import SupportingDocuments from "./Supporting_Documents";

const ProfileWizard = () => {
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    address: "",
    pan: "",
    aadhaar: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    firmPanNumber: "",
    firmPanFile: null,
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    bankDocument: null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSubmit = () => {
    console.log("Submitted Data: ", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 md:ml-64 pt-16 flex items-center justify-center ">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-0"
              onClick={toggleSidebar}
            />
          )}
          
          <div className="w-full max-w-[750px] bg-white p-[30px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] mx-4 my-4">
            {/* Step Tabs */}
            <div className="flex justify-between border-b-2 border-[#eee] mb-5">
              <div
                className={`flex-1 text-center py-[10px] font-medium text-[#999] cursor-pointer transition-colors duration-300 ${
                  step === 1
                    ? "text-blue-600 font-semibold border-b-[3px] border-blue-600"
                    : ""
                }`}
              >
                Personal Details
              </div>
              <div
                className={`flex-1 text-center py-[10px] font-medium text-[#999] cursor-pointer transition-colors duration-300 ${
                  step === 2
                    ? "text-blue-600 font-semibold border-b-[3px] border-blue-600"
                    : ""
                }`}
              >
                Business Details
              </div>
              <div
                className={`flex-1 text-center py-[10px] font-medium text-[#999] cursor-pointer transition-colors duration-300 ${
                  step === 3
                    ? "text-blue-600 font-semibold border-b-[3px] border-blue-600"
                    : ""
                }`}
              >
                Bank Details
              </div>
              <div
                className={`flex-1 text-center py-[10px] font-medium text-[#999] cursor-pointer transition-colors duration-300 ${
                  step === 4
                    ? "text-blue-600 font-semibold border-b-[3px] border-blue-600"
                    : ""
                }`}
              >
                Supporting Documents
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[6px] bg-[#eee] rounded-[5px] mb-4">
              <div
                className="h-full bg-blue-600 rounded-[5px] transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>

            {/* Step Components */}
            {step === 1 && (
              <PersonalDetails
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <BusinessDetails
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <BankDetails
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {step === 4 && (
              <SupportingDocuments
                formData={formData}
                setFormData={setFormData}
                prevStep={prevStep}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWizard;