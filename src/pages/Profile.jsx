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
        `https://podcastapp-back-end.onrender.com/api/podcasts/Podcast/${podcastId}`
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
          `https://podcastapp-back-end.onrender.com/api/user/userinfo`,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center text-xl">{error}</div>
        ) : userData ? (
          <div className="backdrop-blur-lg bg-black/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                <img
                  src={userData.profilePicture || "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"}
                  alt="Profile"
                  className="relative h-48 w-48 rounded-full object-cover border-4 border-white/20"
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  {userData.name}
                </h1>
                <p className="text-xl text-gray-400">{userData.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-white text-xl">Loading user data...</p>
          </div>
        )}

        <div className="flex justify-center gap-8 mt-12 mb-8">
          {['liked', 'saved', 'ownPodcast'].map((type) => (
            <button
              key={type}
              onClick={() => handleSectionChange(type)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                section === type
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold scale-105'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {type === 'liked' ? 'Liked' : type === 'saved' ? 'Saved/Playlist' : 'Own Podcast'}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {section === "liked" && likedPodcasts.length > 0 ? (
            <PodcastList title="Liked Podcasts" podcasts={likedPodcasts} />
          ) : section === "liked" ? (
            <EmptyState message="No liked podcasts found" />
          ) : null}

          {section === "saved" && savedPodcasts.length > 0 ? (
            <PodcastList title="Saved/Playlist Podcasts" podcasts={savedPodcasts} />
          ) : section === "saved" ? (
            <EmptyState message="No saved podcasts found" />
          ) : null}

          {section === "ownPodcast" && ownPodcasts.length > 0 ? (
            <PodcastList title="Your Created Podcasts" podcasts={ownPodcasts} />
          ) : section === "ownPodcast" ? (
            <EmptyState message="No podcasts created by you found" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PodcastList({ title, podcasts }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{title}</h2>
      <div className="grid gap-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast._id}
            className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
                <img
                  src={podcast.imageUrl}
                  className="relative w-20 h-20 object-cover rounded-full border-2 border-white/20"
                  alt={podcast.title}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-gray-400">{podcast.author}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-purple-400">
                  <span className="text-sm text-gray-400">Likes:</span> {podcast.likes}
                </p>
                <p className="text-pink-400">
                  <span className="text-sm text-gray-400">Views:</span> {podcast.views}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <p className="text-xl text-gray-400">{message}</p>
    </div>
  );
}

export default Profile;
