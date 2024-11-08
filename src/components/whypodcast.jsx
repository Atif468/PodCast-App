import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Whypodcast() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const Getstart = () => {
    if (isLoggedIn) {
      navigate("/Home"); // Redirect to home if logged in
    } else {
      navigate("/Login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 text-white p-8 z-50">
      {/* Left Side - Image */}
      <div className="w-full lg:w-[50%] h-auto lg:h-[50%] z-10 mb-8 lg:mb-0">
        <img
          src="/img/podcaster-87.png"
          alt="none"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side - Text */}
      <div className="flex flex-col justify-center z-10 text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Your <span className="text-[#d959ff]">Podcast</span> Hub
        </h2>
        <p className="text-base lg:text-lg mt-3">
          Discover, manage, and share your podcasts seamlessly
        </p>

        <button
          className="bg-[#7a5cff] text-white font-bold text-lg py-2 px-4 rounded mt-4 w-full lg:w-auto"
          onClick={Getstart}
        >
          EXPLORE NEW PODCASTS
        </button>

        <ul className="mt-6 space-y-3 text-base lg:text-lg">
          <li className="flex items-center">
            <span className="text-[#7a5cff] mr-3">•</span> Create and manage
            your podcast episodes
          </li>
          <li className="flex items-center">
            <span className="text-[#7a5cff] mr-3">•</span> Built for creators,
            from casual to professional
          </li>
          <li className="flex items-center">
            <span className="text-[#7a5cff] mr-3">•</span> Share podcasts across
            multiple platforms easily
          </li>
        </ul>

        <button
          className="bg-[#9b51e0] text-white font-bold text-lg py-3 px-8 rounded-lg mt-8 self-start w-full lg:w-auto"
          onClick={Getstart}
        >
          Get Started &gt;
        </button>
      </div>
    </div>
  );
}

export default Whypodcast;
