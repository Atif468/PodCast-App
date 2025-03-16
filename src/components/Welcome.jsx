import Slider from "./swiper.jsx";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Welcome() {

  const { isLoggedIn, logout } = useAuth();
const navigate = useNavigate();
  return (
    <>
       <div className="flex flex-col z-40 md:flex-row items-center justify-around min-h-screen px-4 py-8 ">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left text-white max-w-lg z-10"
        >
          <h1 className="text-3xl md:text-4xl z-50 font-light">Welcome to</h1>
          <div className="text-6xl md:text-8xl font-bold block z-50 my-4">
            <span className="underline decoration-purple-500">PodCast</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hover:scale-105 transition-transform duration-300">.in</span>
          </div>
          <p className="text-sm md:text-lg block mt-6 text-gray-300">
            Discover powerful podcasts and stories that resonate with your
            passions and inspire your journey.
          </p>
          <p className="z-50 text-sm md:text-lg mt-3 text-gray-300">
            Join us in exploring a world of voices, insights, and endless possibilities.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            onClick={()=> {
              isLoggedIn ?  navigate("/Home") : navigate("/Login")
            }}
          >
            Start Listening
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-64 md:h-96 w-full md:w-96 mt-8 md:mt-0"
        >
          <Slider />
        </motion.div>
      </div>
    </>
  );
}

export default Welcome;
