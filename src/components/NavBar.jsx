import React, {useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
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
        {isLogin ? (
          <>
            <Link to="/Home" className="text-white hover:underline">
              Home
            </Link>
            <Link to="/Profile" className="text-white hover:underline">
              Profile
            </Link>
          </>
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