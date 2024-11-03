function ProgressBar({ progressBarRef, audioRef, timeProgress, duration }) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
    // console.log(progressBarRef.current.value);
  };
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  return (
    <div className="flex justify-center w-full">
      <div className="progress">
        <span className="time current">{formatTime(timeProgress)}</span>
        <input
          className="w-4/5"
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
