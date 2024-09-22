import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage'
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
