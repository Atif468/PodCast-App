import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState("liked");
  const [likedPodcasts, setLikedPodcasts] = useState([]);
  const [savedPodcasts, setSavedPodcasts] = useState([]);
  const [ownPodcasts, setOwnPodcasts] = useState([]);

  const api = process.env.END_POINT;

  const getdata = async (podcastId) => {
    try {
      const result = await axios.get(
        `${api}/podcasts/Podcast/${podcastId}`
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
          `${api}/user/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.user);
        console.log(response.data.user);

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
      <div className="bg-black min-h-screen text-white flex flex-col items-center">
        {error ? (
          <p>{error}</p>
        ) : userData ? (
          <div className="flex flex-col md:flex-row items-center w-full max-w-4xl p-5">
            <img
              src={
                userData.profilePicture ||
                "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
              }
              alt="Profile"
              className="h-44 w-44 rounded-full"
            />
            <div className="md:ml-8 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-4xl font-bold">{userData.name}</h1>
              <p className="text-lg text-gray-400">{userData.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className="flex justify-around w-full max-w-4xl text-3xl mt-4">
          <button
            onClick={() => handleSectionChange("liked")}
            className={`hover:text-gray-400 ${
              section === "liked" ? "font-bold border-b-2 border-gray-400" : ""
            }`}
          >
            Liked
          </button>
          <button
            onClick={() => handleSectionChange("saved")}
            className={`hover:text-gray-400 ${
              section === "saved" ? "font-bold border-b-2 border-gray-400" : ""
            }`}
          >
            Saved/Playlist
          </button>
          <button
            onClick={() => handleSectionChange("ownPodcast")}
            className={`hover:text-gray-400 ${
              section === "ownPodcast"
                ? "font-bold border-b-2 border-gray-400"
                : ""
            }`}
          >
            Own Podcast
          </button>
        </div>

        <div className="w-full max-w-4xl mt-6 px-4">
          {section === "liked" && likedPodcasts.length > 0 ? (
            <PodcastList title="Liked Podcasts" podcasts={likedPodcasts} />
          ) : section === "liked" ? (
            <p>No liked podcasts found.</p>
          ) : null}

          {section === "saved" && savedPodcasts.length > 0 ? (
            <PodcastList title="Saved/Playlist Podcasts" podcasts={savedPodcasts} />
          ) : section === "saved" ? (
            <p>No saved podcasts found.</p>
          ) : null}

          {section === "ownPodcast" && ownPodcasts.length > 0 ? (
            <PodcastList title="Your Created Podcasts" podcasts={ownPodcasts} />
          ) : section === "ownPodcast" ? (
            <p>No podcasts created by you found.</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

function PodcastList({ title, podcasts }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-5">{title}:</h2>
      {podcasts.map((podcast) => (
        <div
          className="flex items-center my-3 p-4 rounded-3xl border hover:bg-gray-700 transition-shadow shadow-lg hover:shadow-2xl   cursor-pointer"
          key={podcast._id}
        >
          <img
            src={podcast.imageUrl}
            className="w-16 h-16 object-cover bg-red-300 rounded-full border border-gray-600"
            alt={podcast.title}
          />
          <div className="ml-4 flex-1">
            <p className="text-lg font-semibold">{podcast.title}</p>
            <p className="text-sm text-gray-400">{podcast.author}</p>
          </div>
          <div className="ml-auto text-right text-sm text-gray-400">
            <p>Likes: {podcast.likes}</p>
            <p>Views: {podcast.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
