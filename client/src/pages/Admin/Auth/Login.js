import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPLogin = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP Verification
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials
      );
      setMessage(response.data.message);
      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/verify-otp",
        { otp }
      );
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token); // Store token
      alert("Login Successful");
      navigate("/admin/dashboard");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 ? "Admin Login" : "Enter OTP"}
        </h2>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {otpError && <p className="text-red-500 text-center">{otpError}</p>}

        {step === 1 ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OTPLogin;
