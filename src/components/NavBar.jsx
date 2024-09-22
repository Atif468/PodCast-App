import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <div className="hidden md:flex space-x-6">
          <Link to="/Home" className="text-white">
            Home
          </Link>
          <Link to="/Profile" className="text-white">
            Profile
          </Link>
        </div>
        <button className="md:hidden text-white">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;
