import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
       const response = await axios.post(
        `https://podcastapp-back-end.onrender.com/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { data } = response;

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        await login();
        navigate("/Home");
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      setLoading(true);
      const response = await axios.post(
        `https://podcastapp-back-end.onrender.com/api/user/forgetPassword`,
        { "email": resetEmail },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response: ", response);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        setShowForgotPassword(false);
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Failed to process password reset request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {!showForgotPassword ? (
          <div className="w-full max-w-md bg-black/70 backdrop-blur-sm p-8 space-y-6 rounded-xl shadow-2xl border border-neutral-700/50">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Welcome Back
              </h2>
              <p className="text-neutral-400 text-sm">Sign in to continue your journey</p>
            </div>

            {error && <p className="text-red-500 text-center bg-red-500/10 py-2 rounded-lg">{error}</p>}
            {resetMessage && (
              <p className="text-green-500 text-center bg-green-500/10 py-2 rounded-lg">{resetMessage}</p>
            )}

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none rounded-lg block w-full px-4 py-3 bg-neutral-700/50 text-neutral-100 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none rounded-lg block w-full px-4 py-3 bg-neutral-700/50 text-neutral-100 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                
                <div className="text-sm">
                  <Link
                    to="#"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-400">
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className=" flex items-center justify-center z-50">
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl w-96 relative border border-neutral-700/50 shadow-2xl">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">Reset Password</h3>
              {error && <p className="text-red-500 text-center mb-4 bg-red-500/10 py-2 rounded-lg">{error}</p>}
              <form onSubmit={handleForgetPassword} className="space-y-4">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="appearance-none rounded-lg block w-full px-4 py-3 bg-neutral-700/50 text-neutral-100 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? "Sending..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Separate popup container */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-start justify-center pt-20 pointer-events-none z-[9999]">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out flex items-center space-x-3 pointer-events-auto">
            <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium">Password reset email sent successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
