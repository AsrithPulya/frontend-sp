import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";

const Login = () => {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appPin, setAppPin] = useState("");
  const [step, setStep] = useState("login");
  const navigate = useNavigate();

  const mockOtp = "123456";
  const mockPin = "1234";

  useEffect(() => {
    if (isLoggedIn) {
      setStep("verifyPin");
    }
  }, [isLoggedIn]);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSendOtp = () => {
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      return setError("Enter a valid email or mobile number.");
    }
    setOtpSent(true);
    setError("");
    alert("OTP Sent Successfully (Mock: 123456)");
  };

  const handleOtpLogin = () => {
    if (otp === mockOtp) {
      setIsLoggedIn(true);
    } else {
      setError("Invalid OTP. Try again.");
    }
  };

  const handleVerifyPin = () => {
    if (appPin === mockPin) {
      alert("PIN Verified! Welcome to the App.");
      navigate("/welcome");
    } else {
      setError("Incorrect PIN. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Company Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            {step === "login" ? "Login" : "Enter App PIN"}
          </h2>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {step === "login" ? (
          <>
            <input
              type="text"
              placeholder="Enter Email or Mobile Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {otpSent ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleOtpLogin}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Verify OTP & Login
                </button>
              </>
            ) : (
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Send OTP
              </button>
            )}
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Enter PIN"
              value={appPin}
              onChange={(e) => setAppPin(e.target.value)}
              maxLength={4}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleVerifyPin}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Verify PIN
            </button>
          </>
        )}

        <p className="text-sm text-center mt-4">
          Don't have an account? {" "}
          <button 
            onClick={() => navigate("/User-Registration")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
