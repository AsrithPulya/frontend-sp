import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contact: "",
    otp: "",
    pin: "",
    confirmPin: "",
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
    setStep(3);
  };

  const handlePinSetup = () => {
    if (formData.pin.length !== 4 || isNaN(formData.pin))
      return setError("PIN must be a 4-digit number.");
    if (formData.pin !== formData.confirmPin) return setError("PINs do not match.");
    localStorage.setItem("appPin", formData.pin);
    alert("PIN Set Successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Company Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            {step === 1 ? "Register" : step === 2 ? "Verify OTP" : "Set App PIN"}
          </h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Your Role</h3>
            <div className="flex flex-wrap justify-between mb-6">
              {roles.map((role) => (
                <label key={role} className="flex items-center space-x-2 whitespace-nowrap">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">{role}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              name="contact"
              placeholder="Enter Email or Phone Number"
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <>
            <p className="text-gray-600 mb-4 text-center">Enter OTP sent to your mobile/email.</p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Verify OTP
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p className="text-gray-600 mb-4 text-center">Set a 4-digit App PIN for quick login.</p>
            <input
              type="password"
              name="pin"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPin"
              placeholder="Confirm 4-digit PIN"
              maxLength={4}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePinSetup}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Set PIN
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
