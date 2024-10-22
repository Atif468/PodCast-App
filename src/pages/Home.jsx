import React, { useState } from "react";
import SideList from "../components/SideList";
import AudioPlayer from "../components/audioPlayer";

const Home = () => {
  const [currentPodcast, setCurrentPodcast] = useState(null);

  return (
    <>
      <section className="h-[100%] fixed left-0 overflow-auto touch-auto">
        <SideList setCurrentPodcast={setCurrentPodcast} />
      </section>
      <section className="h-[100%] w-3/4 fixed right-0 overflow-auto touch-auto">
        <AudioPlayer podcast={currentPodcast} />
      </section>
    </>
  );
};

export default Home;
