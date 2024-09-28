import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function SideList() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const response = await fetch("mongodb://127.0.0.1:27017/podcasts");
      const data = await response.json();
      setPodcasts(data);
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="sidebar bg-black  h-[100%] w-1/4 text-white overflow-auto touch-auto fixed">
      <div className="bg-black text-white">
        <div className="flex justify-center h-12 p-2 sticky top-2 backdrop-blur-sm">
          <SearchBar />
        </div>
        <div className="text-black">
          {podcasts.map((podcast) => (
            <div className="flex items-center my-2 p-2 w-[95%] rounded-3xl" key={podcast.id}>
              <img
                src={podcast.image}
                alt={podcast.songName}
                className="w-12 h-12 object-cover rounded-full border"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">{podcast.songName}</p>
                <p className="text-sm text-gray-400">{podcast.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideList;
