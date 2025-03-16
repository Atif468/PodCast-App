import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdMotionPhotosPaused, MdPlayArrow } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AudioPlayer = ({ podcast }) => {
  if (!podcast) {
    return <div className="text-center text-xl text-gray-400 animate-pulse">Click any podcast to listen</div>;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likes, setLikes] = useState(podcast.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (direction) => {
    const seekTime = direction === "forward" ? 10 : -10;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seekTime, 0),
      duration
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token available");
        return;
      }

      const response = await axios.patch(
        `https://podcastapp-back-end.onrender.com/api/podcasts/likes/${podcast._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(response.data.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const addtoPlayList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token available");
        return;
      }

      const response = await axios.patch(
        `https://podcastapp-back-end.onrender.com/api/podcasts/add-to-playlist/${podcast._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Podcast added to your playlist!");
      }
    } catch (error) {
      console.error("Error adding podcast to playlist", error);
      toast.error("Failed to add podcast to playlist");
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen">
        <div className="player text-white min-h-screen flex flex-col items-center justify-between p-8">
          {/* Top section */}
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <ToastContainer />
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                {podcast.title}
              </h2>
              <div className="relative group">
                <img
                  src={podcast.imageUrl}
                  alt="Podcast cover"
                  className="h-32 w-32 md:h-52 md:w-52 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl" />
              </div>
              <p className="text-lg text-gray-300 mt-4 font-medium">{podcast.author}</p>

              <audio
                ref={audioRef}
                src={podcast.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="hidden"
              />
            </div>
          </div>

          {/* Controls and timeline section - Fixed at bottom */}
          <div className="w-full max-w-2xl space-y-6 mb-8">
            {/* Player controls */}
            <div className="flex flex-wrap gap-8 justify-center items-center">
              <button
                className={`transform transition-all duration-200 hover:scale-110 focus:outline-none ${
                  isLiked ? 'text-blue-500' : 'text-white'
                }`}
                onClick={toggleLike}
              >
                <AiFillLike className="h-8 w-8" />
                <span className="text-sm block mt-1">{likes}</span>
              </button>

              <div className="flex items-center gap-6">
                <button
                  className="transform transition-all duration-200 hover:scale-110 focus:outline-none"
                  onClick={() => handleSeek("backward")}
                >
                  <IoIosArrowBack className="h-10 w-10" />
                </button>

                <button
                  className="transform transition-all duration-200 hover:scale-110 focus:outline-none bg-white bg-opacity-10 p-4 rounded-full"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <MdMotionPhotosPaused className="h-12 w-12" />
                  ) : (
                    <MdPlayArrow className="h-12 w-12" />
                  )}
                </button>

                <button
                  className="transform transition-all duration-200 hover:scale-110 focus:outline-none"
                  onClick={() => handleSeek("forward")}
                >
                  <IoIosArrowForward className="h-10 w-10" />
                </button>
              </div>

              <button
                className="transform transition-all duration-200 hover:scale-110 focus:outline-none"
                onClick={addtoPlayList}
              >
                <MdOutlineLibraryAdd className="h-8 w-8" />
                <span className="text-sm block mt-1">Add</span>
              </button>
            </div>

            {/* Timeline */}
            <div className="w-full px-4 pb-4">
              <div className="flex justify-between text-sm mb-2 text-white font-medium">
                <span className="bg-black bg-opacity-50 px-2 py-1 rounded">
                  {formatTime(currentTime)}
                </span>
                <span className="bg-black bg-opacity-50 px-2 py-1 rounded">
                  {formatTime(duration)}
                </span>
              </div>
              <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => (audioRef.current.currentTime = e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default AudioPlayer;
