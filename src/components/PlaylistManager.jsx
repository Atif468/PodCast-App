import { useState } from "react";
import axios from "axios";

function PlaylistManager({ podcastId }) {
  const [playlistName, setPlaylistName] = useState("");

  const handleAddToPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://podcastapp-back-end.onrender.com/api/user/playlists`,
        { playlistName, podcastId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Podcast added to playlist!");
      setPlaylistName(""); // Clear the input after adding
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };

  return (
    <div className="playlist-manager">
      <input
        type="text"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleAddToPlaylist} className="ml-2 bg-blue-500 text-white p-2 rounded">
        Add to Playlist
      </button>
    </div>
  );
}

export default PlaylistManager;
