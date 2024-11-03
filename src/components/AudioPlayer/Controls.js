import { useState, useEffect, useCallback, useRef } from "react";

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoVolumeHigh,
  IoVolumeMute,
  IoVolumeLow,
} from "react-icons/io5";

import useScreenSize from "../useScreenSize";

function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  setCurrentTrack,
  trackIndex,
  setTrackIndex,
  handleNext,
  isPlaying,
  setIsPlaying,
}) {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  const playAnimationRef = useRef();
  const screenSize = useScreenSize();
  const repeat = useCallback(() => {
    // console.log("run");
    let currentTime = audioRef !== null ? audioRef.current.currentTime : 0;
    setTimeProgress(currentTime !== null ? currentTime : 0);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button
          className="text-gray-400 hover:text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={handlePrevious}
          title="Previous Track"
        >
          <IoPlaySkipBackSharp />
        </button>
        <button
          className="text-gray-500 hover:text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={skipBackward}
          title="Skip Backwards 15s"
        >
          <IoPlayBackSharp />
        </button>

        <button
          className="text-white-500 hover:text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={togglePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button
          className="text-gray-500 hover:text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={skipForward}
          title="Skip Forward 15s"
        >
          <IoPlayForwardSharp />
        </button>
        <button
          className="text-gray-400 hover:text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={handleNext}
          title="Next Track"
        >
          <IoPlaySkipForwardSharp />
        </button>
      </div>

      <div className="volume">
        <button
          className="text-white-500 transform hover:scale-110 transition-transform duration-300"
          onClick={() => setMuteVolume((prev) => !prev)}
          title={
            muteVolume || volume < 5
              ? "Mute"
              : volume < 40
              ? "Low Volume"
              : "High Volume"
          }
        >
          {muteVolume || volume < 5 ? (
            <IoVolumeMute />
          ) : volume < 40 ? (
            <IoVolumeLow />
          ) : (
            <IoVolumeHigh />
          )}
        </button>
        {screenSize.width > 650 ? (
          <input
            className="volButton"
            type="range"
            orient="vertical"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              background: `linear-gradient(to top, #32CD32 ${
                (volume / 100) * 100
              }%, #fff 0%)`,
            }}
            title={`Volume: ${volume}`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Controls;
