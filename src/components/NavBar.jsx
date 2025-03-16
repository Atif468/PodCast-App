import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <nav className="bg-black/95 backdrop-blur-sm sticky h-20 p-4 top-0 z-[1000]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-white pacifico-regular text-3xl ml-2 hover:text-purple-400 transition-colors duration-300"
          >
            PodCast.in
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link
                to="/UploadPodcast"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
              >
                <IoMdAddCircleOutline className="text-2xl" />
                <span>Upload</span>
              </Link>
              <Link
                to="/Profile"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
              >
                <FaRegUser className="text-xl" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  handleLogout();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/Login"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl hover:text-purple-400 transition-colors duration-300"
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 text-white z-[999]">
          <div className="flex flex-col space-y-4 p-6">
            {isLoggedIn ? (
              <>
                <Link
                  to="/UploadPodcast"
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IoMdAddCircleOutline className="text-2xl" />
                  <span>Upload Podcast</span>
                </Link>
                <Link
                  to="/Profile"
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaRegUser className="text-xl" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/Login"
                className="w-full py-2 text-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
