import React, { useState } from "react";
import SideList from "../components/SideList";
import AudioPlayer from "../components/audioPlayer";

const Home = () => {
  const [currentPodcast, setCurrentPodcast] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <section className="w-full md:w-1/4 h-full">
        <SideList setCurrentPodcast={setCurrentPodcast} />
      </section>
      <section className="w-full md:w-3/4 h-full">
        <AudioPlayer podcast={currentPodcast} />
      </section>
    </div>
  );
};

export default Home;
