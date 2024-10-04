import React from "react";

const VideoPlayer = ({ podcast }) => {
  if (!podcast) {
    return (
      <div className="text-center text-white">Select a podcast to play</div>
    );
  }

  return (
    <div className="player bg-gray-900 text-white h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">{podcast.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{podcast.author}</p>
        <audio controls src={podcast.audioUrl} className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default VideoPlayer;
