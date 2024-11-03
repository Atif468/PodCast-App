import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdMotionPhotosPaused, MdPlayArrow } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

const AudioPlayer = ({ podcast }) => {
  if (!podcast) {
    return <div>Click any podcast to listen</div>;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likes, setLikes] = useState(podcast.likes || 0); 
  const [views, setViews] = useState(podcast.views || 0);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && views === podcast.views) {
      incrementViews();
    }
  }, [isPlaying]);

  const incrementViews = async () => {
    try {
      const response = await axios.patch(`/api/podcast/${podcast._id}/views`);
      setViews(response.data.views);
    } catch (error) {
      console.error("Error incrementing views", error);
    }
  };

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
    audioRef.current.currentTime = Math.min(Math.max(audioRef.current.currentTime + seekTime, 0), duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error("No token available");
        return;
      }

      const response = await axios.patch(`http://localhost:8080/api/podcasts/likes/${podcast._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      setLikes(response.data.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const addtoPlayList = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error("No token available");
        return;
      }

      const response = await axios.patch(
        `http://localhost:8080/api/podcasts/add-to-playlist/${podcast._id}`, 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Podcast added to your playlist!"); // Show success notification
      }
    } catch (error) {
      console.error("Error adding podcast to playlist", error);
      toast.error("Failed to add podcast to playlist"); // Show error notification
    }
  };

  return (
    <div className="player bg-gray-900 text-white h-full flex flex-col items-center justify-center">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="text-center">
        <h2 className="text-2xl mb-4">{podcast.title}</h2>
        <img
          src={podcast.imageUrl}
          alt="Podcast cover"
          className="h-96 w-96 bg-white text-black"
        />
        <p className="text-sm text-gray-400 mb-4">{podcast.author}</p>
        <p className="text-sm text-gray-400 mb-4">{views} views</p>

        <audio
          ref={audioRef}
          src={podcast.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full hidden"
        />
      </div>

      <div className="flex gap-10 items-center">
        <AiFillLike
          className={`h-10 w-10 hover:cursor-pointer ${isLiked ? "text-blue-500" : ""}`}
          onClick={toggleLike}
        />
        <p>{likes} Likes</p>
        <IoIosArrowBack className="h-16 w-16 hover:cursor-pointer" onClick={() => handleSeek("backward")} />
        <div onClick={togglePlayPause}>
          {isPlaying ? (
            <MdMotionPhotosPaused className="h-16 w-16 hover:cursor-pointer" />
          ) : (
            <MdPlayArrow className="h-16 w-16 hover:cursor-pointer" />
          )}
        </div>
        <IoIosArrowForward className="h-16 w-16 hover:cursor-pointer" onClick={() => handleSeek("forward")} />
        <a href={podcast.audioUrl} download>
          <GoDownload className="h-10 w-10 hover:cursor-pointer" />
        </a>
        <CiMenuKebab className="h-10 w-10 hover:cursor-pointer" />
        
        <MdOutlineLibraryAdd className="h-10 w-10 hover:cursor-pointer" 
        onClick={addtoPlayList}/>
      </div>

      <div className="w-full flex items-center mt-4 px-10">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="mx-4 flex-grow"
          value={currentTime}
          max={duration}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
        />
        <span className="text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
