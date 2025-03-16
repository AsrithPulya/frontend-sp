import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import background from "../assets/background.jpg";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contact: "",
    otp: "",
    role: "Self",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const roles = ["Self", "SabbPe Employee", "Bank", "Distributor"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contact) return setError("Email or Phone Number is required.");
    setError("");
    setStep(2);
    alert("OTP Sent Successfully (Mock: 123456)");
  };

  const verifyOtp = () => {
    if (formData.otp !== "123456") return setError("Invalid OTP. Try again.");
    setError("");
    alert("Registration Successful!");
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-xl z-10 relative">
        {/* Logo centered above the form */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Company Logo" className="w-32 h-32 object-contain" />
        </div>

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {step === 1 ? "Register" : "Verify OTP"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {step === 1 ? "Create your account" : "Verify your identity"}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-6 text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Your Role</h3>
              <div className="flex flex-row justify-between items-center">
                {roles.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      className="form-radio text-blue-600 focus:ring-blue-600"
                    />
                    <span className="text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Email or Mobile Number
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter Email or Phone Number"
                onChange={handleChange}
                className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-md hover:from-blue-700 hover:to-blue-800 transition duration-200 font-semibold shadow-md"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <p className="text-gray-600 mb-6 text-center">Enter OTP sent to your mobile/email.</p>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
                className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-md hover:from-blue-700 hover:to-blue-800 transition duration-200 font-semibold shadow-md"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;