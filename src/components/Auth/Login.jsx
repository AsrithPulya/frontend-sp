import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import background from "../assets/background.jpg";
import axios from "axios"; // Import axios

const Login = () => {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const mockOtp = "147369"; // For testing purposes; replace with API response later

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSendOtp = async () => {
    // Validate input
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      return setError("Enter a valid email or mobile number.");
    }

    const isEmail = isValidEmail(contact);
    if (!isEmail) {
      setError("This API only supports email-based OTP for now.");
      return;
    }

    try {
      // Prepare the form-data payload
      const formData = new FormData();
      formData.append("uname", contact); // Email or mobile number
      formData.append("usertype", "Distributor");
      formData.append("ltype", "email"); // Corrected from "ltype" to "type"

      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Make the API call using axios.post with CORS proxy, no headers
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/http://test.sabbpe.com/api/v1/auth/sendemailotp",
        formData
      );

      // Check if the request was successful
      if (!response.data || response.status !== 200) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      // Log the response for debugging
      console.log("API Response:", response.data);

      // On success, update the UI
      setOtpSent(true);
      setError("");
      alert("OTP Sent Successfully");
    } catch (err) {
      console.error("Network Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleOtpLogin = async () => {
    // Validate OTP input
    if (!otp) {
      return setError("Please enter the OTP.");
    }
  
    try {
      // Prepare the form-data payload
      const formData = new FormData();
      formData.append("uname", contact); // Email used for sending OTP
      formData.append("otp", otp);       // OTP entered by user
  
      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // Make the API call using axios.post with CORS proxy
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/http://test.sabbpe.com/api/v1/auth/verifyotp",
        formData
      );
  
      // Check if the request was successful
      if (!response.data || response.status !== 200) {
        throw new Error(`OTP verification failed: ${response.status} - ${response.statusText}`);
      }
  
      // Log the response for debugging
      console.log("API Response (Verify OTP):", response.data);
  
      // On success, navigate to dashboard
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error Details (Verify OTP):", {
        message: err.message,
        response: err.response ? err.response.data : "No response",
        status: err.response ? err.response.status : "No status",
      });
      setError(err.message || "Invalid OTP. Please try again.");
    }
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

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md z-10 relative">
        {/* Logo centered above the form */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Company Logo" className="w-24 h-24 object-contain" />
        </div>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <p className="text-sm text-gray-600 mt-1">Please enter your credentials</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-6">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Email or Mobile Number
            </label>
            <input
              type="text"
              id="contact"
              placeholder="Enter Email or Mobile Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>

          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
            </div>
          )}

          <button
            onClick={otpSent ? handleOtpLogin : handleSendOtp}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-md hover:from-blue-700 hover:to-blue-800 transition duration-200 font-semibold shadow-md"
          >
            {otpSent ? "Verify OTP & Login" : "Send OTP"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/User-Registration")}
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;