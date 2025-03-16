import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Whypodcast() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const Getstart = () => {
    if (isLoggedIn) {
      navigate("/Home"); 
    } else {
      navigate("/Login");  
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 text-white p-8 z-50 min-h-screen">
      <div className="w-full lg:w-[50%] h-auto lg:h-[50%] z-10 mb-8 lg:mb-0 transform hover:scale-105 transition-transform duration-300">
        <img
          src="/img/podcaster-87.png"
          alt="Podcast Hub"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      <div className="flex flex-col justify-center z-10 text-center lg:text-left space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#d959ff] to-[#7a5cff] bg-clip-text text-transparent">
            Your Podcast Hub
          </h2>
          <p className="text-lg lg:text-xl text-gray-300">
            Discover, manage, and share your podcasts seamlessly
          </p>
        </div>

        <button
          className="bg-gradient-to-r from-[#7a5cff] to-[#d959ff] text-white font-bold text-lg py-3 px-6 rounded-lg 
                     hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg w-full lg:w-auto"
          onClick={Getstart}
        >
          EXPLORE NEW PODCASTS
        </button>

        <ul className="space-y-4 text-lg lg:text-xl">
          {[
            "Create and manage your podcast episodes",
            "Built for creators, from casual to professional",
            "Share podcasts across multiple platforms easily"
          ].map((text, index) => (
            <li key={index} className="flex items-center space-x-3 group">
              <span className="h-2 w-2 rounded-full bg-[#7a5cff] group-hover:bg-[#d959ff] transition-colors duration-300"/>
              <span className="group-hover:text-[#d959ff] transition-colors duration-300">{text}</span>
            </li>
          ))}
        </ul>

        <button
          className="bg-gradient-to-r from-[#9b51e0] to-[#d959ff] text-white font-bold text-lg py-3 px-8 
                     rounded-lg shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300
                     w-full lg:w-auto"
          onClick={Getstart}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Whypodcast;
