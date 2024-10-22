import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 sticky">
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
        
        <button className="md:hidden text-white">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;
