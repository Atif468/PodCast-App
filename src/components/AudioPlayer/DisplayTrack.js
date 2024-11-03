import { BsMusicNoteBeamed } from "react-icons/bs";
import useScreenSize from "../useScreenSize";
function DisplayTrack({
  currentTrack,
  audioRef,
  progressBarRef,
  setDuration,
  handleNext,
}) {
  const onLoadedMetadata = () => {
    // console.log(audioRef.current.duration);
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const screenSize = useScreenSize();
  // console.log(screenSize);
  return (
    <div>
      <audio
        src={currentTrack?.podcast ? currentTrack?.podcast : " "}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info flex justify-center">
        <div className="pl-2 md:pl-0 min-w-[50px] ">
          {currentTrack?.img ? (
            <img
              className="rounded-2xl"
              width="75px"
              src={currentTrack.img}
              alt="audio avatar"
            />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>

        {screenSize.width > 900 ? (
          <div>
            <div className="text font-sans font-thin">
              {currentTrack?.name.length > 15 ? (
                <marquee behavior="scroll" direction="left">
                  <p className="title" style={{ fontWeight: "500" }}>
                    {currentTrack?.name}
                  </p>
                </marquee>
              ) : (
                <p className="title">
                  {currentTrack?.name.slice(
                    0,
                    Math.min(currentTrack.name.length, 15)
                  )}
                </p>
              )}
              <p>{currentTrack?.artist}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DisplayTrack;
