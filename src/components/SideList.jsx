import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function SideList({ setCurrentPodcast }) {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`https://podcastapp-back-end.onrender.com/api/podcasts/data`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setPodcasts(result.data);
        } else {
          console.error("API did not return an array", result);
          setPodcasts([]);
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setPodcasts([]);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar bg-black w-full h-full text-white  p-4 border-r-2">
      <div className="bg-black text-white">
        <div className="flex justify-center h-12 p-2 sticky top-0 backdrop-blur-sm">
          <SearchBar onSearchChange={setSearchQuery} />
        </div>
        <hr className="bg-white" />
        <div className="text-white">
          {filteredPodcasts.map((podcast) => (
            <div
              className="flex items-center my-2 p-2 w-full rounded-3xl bg-gray-800 hover:bg-gray-700 cursor-pointer"
              key={podcast._id}
              onClick={() => setCurrentPodcast(podcast)}
            >
              <img
                src={podcast.imageUrl}
                className="w-12 h-12 object-cover rounded-full border"
              />
              <div className="ml-4 flex-grow">
                <p className="text-lg font-semibold">{podcast.title}</p>
                <p className="text-sm text-gray-400">{podcast.author}</p>
              </div>
              <div className="ml-auto text-sm text-gray-400">
                <p>Likes: {podcast.likes}</p>
                <p>Views: {podcast.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideList;
