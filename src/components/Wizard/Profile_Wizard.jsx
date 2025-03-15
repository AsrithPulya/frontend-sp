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
    panVerified: false,
    panStatus: null,
    aadhaar: "",
    aadhaarVerified: false,
    aadhaarStatus: null,
    businessName: "",
    businessType: "",
    businessAddress: "",
    firmPanNumber: "",
    firmPanVerified: false,
    firmPanStatus: null,
    firmPanFile: null,
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    bankVerified: false,
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
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col px-12 py-6">
          <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between border-b-2 border-gray-300 pb-3">
              {["Personal Details", "Business Details", "Bank Details", "Supporting Documents"].map(
                (label, index) => (
                  <div
                    key={index}
                    className={`flex-1 text-center py-2 text-gray-600 cursor-pointer transition-all duration-300 ${
                      step === index + 1 ? "text-blue-600 font-semibold border-b-4 border-blue-600" : ""
                    }`}
                  >
                    {label}
                  </div>
                )
              )}
            </div>

            <div className="w-full h-2 bg-gray-300 rounded-md mt-4">
              <div
                className="h-full bg-blue-600 rounded-md transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>

            <div className="w-full mt-6">
              {step === 1 && <PersonalDetails formData={formData} setFormData={setFormData} nextStep={nextStep} />}
              {step === 2 && <BusinessDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
              {step === 3 && <BankDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
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
    </div>
  );
};

export default ProfileWizard;