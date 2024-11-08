import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await axios.post("https://podcastapp-back-end.onrender.com/api/user/login", 
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { data } = response;

      if (data && data.token) {
        await localStorage.setItem("token", data.token);
        login();
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {loading && <h1 className="text-white text-xl">Loading...</h1>}
      <div className="w-full max-w-md bg-gray-800 p-6 sm:p-8 space-y-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-md block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-md block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="#" className="font-medium text-indigo-400 hover:text-indigo-300">
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
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/Signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
