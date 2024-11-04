import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState("liked");
  const [likedPodcasts, setLikedPodcasts] = useState([]);
  const [savedPodcasts, setSavedPodcasts] = useState([]);
  const [ownPodcasts, setOwnPodcasts] = useState([]);

  const getdata = async (podcastId) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/podcasts/Podcast/${podcastId}`
      );
      return result.data;
    } catch (err) {
      console.error("Error fetching podcast data:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        // Fetch user info
        const response = await axios.get(
          "http://localhost:8080/api/user/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.user);

        if (response.data.user.likedPodcasts) {
          const podcastsData = await Promise.all(
            response.data.user.likedPodcasts.map((podcastId) =>
              getdata(podcastId)
            )
          );
          setLikedPodcasts(podcastsData.filter((podcast) => podcast));
        }

        if (response.data.user.playlist) {
          const savedData = await Promise.all(
            response.data.user.playlist.map((podcastId) => getdata(podcastId))
          );
          setSavedPodcasts(savedData.filter((podcast) => podcast));
        }

        if (response.data.user.createdPodcasts) {
          const createdData = await Promise.all(
            response.data.user.createdPodcasts.map((podcastId) =>
              getdata(podcastId)
            )
          );
          setOwnPodcasts(createdData.filter((podcast) => podcast));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSectionChange = (newSection) => {
    setSection(newSection);
  };

  return (
    <>
      <div className="bg-black text-white h-full w-full flex flex-row">
        {error ? (
          <p>{error}</p>
        ) : userData ? (
          <>
            <div className="w-1/3 p-5">
              <img
                src={
                  userData.profilePicture ||
                  "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
                }
                alt="Profile"
                className="h-44 w-44 rounded-full"
              />
            </div>
            <div className="text-4xl font-bold w-full p-10">
              <h1>{userData.name}</h1>
              <p>{userData.email}</p>
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      <div className="flex flex-row justify-around text-3xl mt-4">
        <button
          onClick={() => handleSectionChange("liked")}
          className={`hover:text-gray-400 ${
            section === "liked" ? "font-bold" : ""
          }`}
        >
          Liked
        </button>
        <button
          onClick={() => handleSectionChange("saved")}
          className={`hover:text-gray-400 ${
            section === "saved" ? "font-bold" : ""
          }`}
        >
          Saved/Playlist
        </button>
        <button
          onClick={() => handleSectionChange("ownPodcast")}
          className={`hover:text-gray-400 ${
            section === "ownPodcast" ? "font-bold" : ""
          }`}
        >
          Own Podcast
        </button>
      </div>

      {section === "liked" && likedPodcasts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mt-5">Liked Podcasts:</h2>
          {likedPodcasts.map((podcast) => (
            <div
              className="flex items-center my-2 p-2 w-[95%] rounded-3xl bg-gray-800 hover:bg-gray-700 cursor-pointer"
              key={podcast._id}
            >
              <img
                src={podcast.imageUrl}
                className="w-12 h-12 object-cover rounded-full border"
                alt={podcast.title}
              />
              <div className="ml-4">
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
      ) : section === "liked" ? (
        <p>No liked podcasts found.</p>
      ) : null}

      {section === "saved" && savedPodcasts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mt-5">Saved/Playlist Podcasts:</h2>
          {savedPodcasts.map((podcast) => (
            <div
              className="flex items-center my-2 p-2 w-[95%] rounded-3xl bg-gray-800 hover:bg-gray-700 cursor-pointer"
              key={podcast._id}
            >
              <img
                src={podcast.imageUrl}
                className="w-12 h-12 object-cover rounded-full border"
                alt={podcast.title}
              />
              <div className="ml-4">
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
      ) : section === "saved" ? (
        <p>No saved podcasts found.</p>
      ) : null}

      {section === "ownPodcast" && ownPodcasts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mt-5">Your Created Podcasts:</h2>
          {ownPodcasts.map((podcast) => (
            <div
              className="flex items-center my-2 p-2 w-[95%] rounded-3xl bg-gray-800 hover:bg-gray-700 cursor-pointer"
              key={podcast._id}
            >
              <img
                src={podcast.imageUrl}
                className="w-12 h-12 object-cover rounded-full border"
                alt={podcast.title}
              />
              <div className="ml-4">
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
      ) : section === "ownPodcast" ? (
        <p>No podcasts created by you found.</p>
      ) : null}
    </>
  );
}

export default Profile;
