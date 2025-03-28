import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import background from "../assets/background.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("Zonal"); // Default role set to "Zonal"
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const mockOtp = "147369"; // For testing purposes; replace with API response later

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSendOtp = async () => {
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      setError("Enter a valid email or mobile number.");
      toast.error("Invalid email or mobile number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const isEmail = isValidEmail(contact);
    if (!isEmail) {
      setError("This API only supports email-based OTP for now.");
      toast.warn("Only email-based OTP is supported!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uname", contact);
      formData.append("usertype", role); // Updated to use selected role
      formData.append("ltype", "email");
      formData.append("user_under", "GLOBLE-1");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        "http://test.sabbpe.com/api/v1/auth/sendemailotp",
        formData
      );

      if (!response.data || response.status !== 200) {
        throw new Error("Failed to send OTP. Please try again.");
      }
      const user_under = response.data.user_under;
      localStorage.setItem("user_under", user_under);

      console.log("API Response:", response.data);

      setOtpSent(true);
      setError("");
      toast.success("OTP Sent Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Network Error:", err);
      const errorMessage = err.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleOtpLogin = async () => {
    if (!otp) {
      return setError("Please enter the OTP.");
    }

    try {
      const formData = new FormData();
      formData.append("uname", contact);
      formData.append("otp", otp);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        "http://test.sabbpe.com/api/v1/auth/verifyotp",
        formData
      );

      if (!response.data || response.status !== 200) {
        throw new Error(`OTP verification failed: ${response.status} - ${response.statusText}`);
      }

      console.log("API Response (Verify OTP):", response.data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved to localStorage:", token);
      } else {
        console.warn("No token found in response:", response.data);
      }

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md z-10 relative">
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

          {/* Role Selection Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="zonal"
                  name="role"
                  value="Zonal"
                  checked={role === "Zonal"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="zonal" className="ml-2 text-sm text-gray-700">
                  Zonal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="distributor"
                  name="role"
                  value="Distributor"
                  checked={role === "Distributor"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="distributor" className="ml-2 text-sm text-gray-700">
                  Distributor
                </label>
              </div>
            </div>
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