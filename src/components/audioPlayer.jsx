import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdMotionPhotosPaused, MdPlayArrow } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision.jsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AudioPlayer = ({ podcast }) => {
  if (!podcast) {
    return <div>Click any podcast to listen</div>;
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
      <div className="player z-50 text-white h-full flex flex-col items-center justify-center p-4">
        <ToastContainer />
        <div className="text-center mb-4">
          <h2 className="text-2xl">{podcast.title}</h2>
          <img
            src={podcast.imageUrl}
            alt="Podcast cover"
            className="h-48 w-48 md:h-96 md:w-96 object-cover mb-4"
          />
          <p className="text-sm text-gray-400">{podcast.author}</p>

          <audio
            ref={audioRef}
            src={podcast.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full hidden"
          />
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center mb-4">
          <AiFillLike
            className={`h-10 w-10 hover:cursor-pointer ${
              isLiked ? "text-blue-500" : ""
            }`}
            onClick={toggleLike}
          />
          <p>{likes} Likes</p>
          <IoIosArrowBack
            className="h-12 w-12 hover:cursor-pointer"
            onClick={() => handleSeek("backward")}
          />
          <div onClick={togglePlayPause}>
            {isPlaying ? (
              <MdMotionPhotosPaused className="h-12 w-12 hover:cursor-pointer" />
            ) : (
              <MdPlayArrow className="h-12 w-12 hover:cursor-pointer" />
            )}
          </div>
          <IoIosArrowForward
            className="h-12 w-12 hover:cursor-pointer"
            onClick={() => handleSeek("forward")}
          />
          <MdOutlineLibraryAdd
            className="h-10 w-10 hover:cursor-pointer"
            onClick={addtoPlayList}
          />
        </div>

        <div className="w-full">
          <p>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            className="w-full h-1 accent-gray-700 cursor-pointer"
          />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default AudioPlayer;
