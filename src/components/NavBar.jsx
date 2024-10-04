import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import UploadPodcast from "./UploadPodcast";
const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 sticky">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="PodCast Logo" className="h-8 w-8" />
          <Link
            to="/"
            className="text-white text-3xl ml-2"
            style={{
              backgroundImage:
                "linear-gradient(0deg, #6678d9 13%, #6b1317 87%, #03371e 76%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PodCast.in
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-white">
          {isLoggedIn ? (
            <div className="text-center flex gap-5 justify-center align-middle">
              <Link to="/UploadPodcast">
                <div className="flex items-center p-2 hover:bg-gray-200 rounded transition duration-300">
                  <IoMdAddCircleOutline aria-label="Add Podcast" />
                </div>
              </Link>
              <Link
                to="/Home"
                className="text-white hover:underline"
                data-aos="fade-top-right"
              >
                <h1>Home</h1>
              </Link>
              <Link
                to="/Profile"
                className="text-white hover:underline"
                data-aos="fade-top-right"
              >
                <div className="flex items-center p-2 hover:bg-gray-200 rounded transition duration-300">
                  <FaRegUser className="text-xl" aria-label="User Profile" />
                </div>
              </Link>
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
