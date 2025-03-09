import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg"

const Login = () => {
  const [step, setStep] = useState("login");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [appPin, setAppPin] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const mockPhoneNumber = "+911234567890";
  const mockPassword = "test";
  const mockOtp = "123456";
  const mockPin = "1234";

  useEffect(() => {
    if (isLoggedIn) {
      setStep("verifyPin");
    }
  }, [isLoggedIn]);

  const handleSendOtp = () => {
    if (!contact) return setError("Enter a valid mobile number.");
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

  const handlePasswordLogin = () => {
    const formattedContact = contact.startsWith("+91") ? contact : `+91${contact}`;
    if (formattedContact === mockPhoneNumber && password === mockPassword) {
      setIsLoggedIn(true);
    } else {
      setError("Login failed. Check credentials.");
    }
  };

  const handleForgotPassword = () => {
    if (!otpSent) return handleSendOtp();
    if (otp !== mockOtp) return setError("Invalid OTP. Try again.");
    if (!newPassword || !confirmNewPassword) return setError("Enter new password.");
    if (newPassword !== confirmNewPassword) return setError("Passwords do not match.");
    alert("Password reset successful!");
    setForgotPassword(false);
    setStep("login");
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
            {step === "login" ? "Login" : step === "forgotPassword" ? "Reset Password" : "Enter App PIN"}
          </h2>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {step === "login" ? (
          isLoggedIn ? (
            <p className="text-green-600 text-center">Welcome! You are logged in.</p>
          ) : forgotPassword ? (
            <>
              <input
                type="text"
                placeholder="Enter Mobile Number"
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
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleForgotPassword}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Verify & Reset Password
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
              <button
                onClick={() => setForgotPassword(false)}
                className="w-full mt-2 text-blue-500 hover:underline"
              >
                Back to Login
              </button>
            </>
          ) : useOtp ? (
            <>
              <input
                type="text"
                placeholder="Enter Mobile Number"
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
              <button
                onClick={() => setUseOtp(false)}
                className="w-full mt-2 text-blue-500 hover:underline"
              >
                Back to Password Login
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm mb-4">
                <a
                  href="#"
                  onClick={() => setForgotPassword(true)}
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
              <button
                onClick={handlePasswordLogin}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 mb-2"
              >
                Login with Password
              </button>
              <button
                onClick={() => setUseOtp(true)}
                className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition duration-200 mb-2"
              >
                Login with OTP
              </button>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Register
                </a>
              </p>
            </>
          )
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
      </div>
    </div>
  );
};

export default Login;