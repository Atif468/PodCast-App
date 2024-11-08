import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="PodCast Logo" className="h-8 w-8" />
          <Link to="/" className="text-white text-3xl ml-2">
            PodCast.in
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-white">
          {isLoggedIn ? (
            <div className="flex gap-5">
              <Link to="/UploadPodcast">
                <IoMdAddCircleOutline aria-label="Add Podcast" />
              </Link>
              <Link to="/Home">Home</Link>
              <Link to="/Profile">
                <FaRegUser aria-label="User Profile" />
              </Link>
              <button onClick={logout} className="text-white">Logout</button>
            </div>
          ) : (
            <Link to="/Login" className="text-white hover:underline">
              Sign in/Sign up
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white space-y-4 py-4 px-6">
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <Link to="/UploadPodcast" className="flex items-center">
                <IoMdAddCircleOutline aria-label="Add Podcast" />
                Add Podcast
              </Link>
              <Link to="/Home">Home</Link>
              <Link to="/Profile" className="flex items-center">
                <FaRegUser aria-label="User Profile" />
                Profile
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/Login" className="text-white hover:underline">
              Sign in/Sign up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
