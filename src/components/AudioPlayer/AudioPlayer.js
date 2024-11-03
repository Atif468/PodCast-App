import { useState, useRef, useEffect } from "react";

import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";

import "./index.css";

function AudioPlayer({
  tracks,
  trackIndex,
  setTrackIndex,
  isPlaying,
  setIsPlaying,
}) {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => setCurrentTrack(tracks[trackIndex]), [tracks, trackIndex]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <div className="audio-player w-screen backdrop-filter backdrop-blur-md">
      <div className="px-3">
        <div className="flex  w-full flex-row">
          <div className="basis-1/12 md:basis-1/5 pt-4">
            <DisplayTrack
              currentTrack={currentTrack}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              setDuration={setDuration}
              handleNext={handleNext}
            />
          </div>
          <div className="basis-11/12 md:basis-4/5">
            <div className="pb-2">
              <div className="flex justify-center">
                <Controls
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  audioRef={audioRef}
                  progressBarRef={progressBarRef}
                  duration={duration}
                  setTimeProgress={setTimeProgress}
                  tracks={tracks}
                  setCurrentTrack={setCurrentTrack}
                  trackIndex={trackIndex}
                  setTrackIndex={setTrackIndex}
                  handleNext={handleNext}
                  timeProgress={timeProgress}
                />
              </div>
              <div className="flex justify-center ">
                <ProgressBar
                  progressBarRef={progressBarRef}
                  timeProgress={timeProgress}
                  audioRef={audioRef}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
