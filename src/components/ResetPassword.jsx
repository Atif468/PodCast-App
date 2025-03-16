import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `https://podcastapp-back-end.onrender.com/api/user/reset-password`,
        { token, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      
      setSuccess(true);
      setTimeout(() => navigate("/Login"), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Reset token has expired. Please request a new password reset.");
      } else {
        setError(err.response?.data?.message || "Failed to reset password");
      }
      console.log("error: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a]">
      <div className="bg-[#2d2d2d] p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center mb-6">Reset Password</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success ? (
          <p className="text-green-500 text-center">Password reset successful! Redirecting...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#3d3d3d] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#3d3d3d] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition duration-200">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
