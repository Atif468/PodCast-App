import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadPodcast from "./components/UploadPodcast";
import ResetPassword from "./components/ResetPassword";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen h-screen flex flex-col">
          <Navbar />
        <div className="flex-grow h-[calc(100vh-5rem)]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/UploadPodCast" element={<UploadPodcast />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
