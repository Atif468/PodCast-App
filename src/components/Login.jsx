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
      setResetMessage("Password reset instructions sent to your email!");
      setShowForgotPassword(false);
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
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      {!showForgotPassword ? (
        <div className="w-full max-w-md bg-neutral-800 p-6 sm:p-8 space-y-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {resetMessage && (
            <p className="text-green-500 text-center">{resetMessage}</p>
          )}

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 bg-neutral-700 text-neutral-300 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 bg-neutral-700 text-neutral-300 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-neutral-600 rounded"
                />
                {/* <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-neutral-300"
                >
                  Remember me
                </label> */}
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Don't have an account?{" "}
              <Link
                to="/Signup"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Reset Password</h3>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleForgetPassword}>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                className="appearance-none rounded-md block w-full px-3 py-2 bg-neutral-700 text-neutral-300 border border-neutral-600 placeholder-neutral-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-sm text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
