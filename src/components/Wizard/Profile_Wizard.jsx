import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import PersonalDetails from "./Personal_Details";
import BusinessDetails from "./Business_Details";
import BankDetails from "./Bank_Details";
import SupportingDocuments from "./Supporting_Documents";

const ProfileWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    address1: "",
    address2: "",
    pan: "",
    panVerified: false,
    panStatus: null,
    panFile: null,
    aadhaar: "",
    aadhaarVerified: false,
    aadhaarStatus: null,
    aadhaarFront: null,
    aadhaarConsent: false,
    businessName: "",
    businessType: "",
    firmPanNumber: "",
    firmPanVerified: false,
    firmPanStatus: null,
    firmPanFile: null,
    gstNumber: "",
    gstVerified: false,
    gstStatus: null,
    businessRegistrationFile: null,
    addressProofFile: null,
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    bankVerified: false,
    bankDocument: null,
    uploadedDocuments: [],
  });

  const [stepComplete, setStepComplete] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = () => {
    console.log("Submitted Data: ", formData);
    alert("Form Submitted Successfully!");
  };

  const steps = [
    { number: 1, label: "Personal Info", subLabel: "Enter Your Details" },
    { number: 2, label: "Business Details", subLabel: "Your Business Details" },
    { number: 3, label: "Bank Details", subLabel: "Setup Bank Details" },
    { number: 4, label: "Supporting Docs", subLabel: "Upload Documents" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Navbar toggleSidebar={() => {}} /> {/* No-op since Sidebar is global */}
      <main className="flex-1 p-8 ml-80" style={{ marginTop: "64px" }}>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="relative mb-8">
            <div className="flex justify-between">
              {steps.map((stepItem, index) => (
                <div key={index} className="text-center flex-1 z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                      step === stepItem.number
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepItem.number}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      step === stepItem.number ? "text-indigo-600" : "text-gray-500"
                    }`}
                  >
                    {stepItem.label}
                    <div className="text-xs text-gray-400">{stepItem.subLabel}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" style={{ marginTop: "-2px" }}>
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <PersonalDetails
                formData={formData}
                setFormData={setFormData}
                setStepComplete={(complete) => setStepComplete((prev) => ({ ...prev, 1: complete }))}
              />
            )}
            {step === 2 && (
              <BusinessDetails
                formData={formData}
                setFormData={setFormData}
                setStepComplete={(complete) => setStepComplete((prev) => ({ ...prev, 2: complete }))}
              />
            )}
            {step === 3 && (
              <BankDetails
                formData={formData}
                setFormData={setFormData}
                setStepComplete={(complete) => setStepComplete((prev) => ({ ...prev, 3: complete }))}
              />
            )}
            {step === 4 && (
              <SupportingDocuments
                formData={formData}
                setFormData={setFormData}
                setStepComplete={(complete) => setStepComplete((prev) => ({ ...prev, 4: complete }))}
              />
            )}
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                ← Previous
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!stepComplete[step]}
                className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  !stepComplete[step] ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!stepComplete[step]}
                className={`px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  !stepComplete[step] ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-teal-600"
                }`}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileWizard;