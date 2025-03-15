import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import background from "../assets/background.jpg";


const Login = () => {
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const mockOtp = "147369";

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSendOtp = () => {
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      return setError("Enter a valid email or mobile number.");
    }
    setOtpSent(true);
    setError("");
    alert("OTP Sent Successfully");
  };

  const handleOtpLogin = () => {
    if (otp === mockOtp) {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
    {/* Logo placed correctly inside the card */}
    <img src={logo} alt="Company Logo" className="absolute top-2 left-8 w-20 h-20" />

    <div className="flex flex-col items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
    </div>

    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

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
