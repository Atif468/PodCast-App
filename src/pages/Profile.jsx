import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState("liked"); // Added state for section
  const [likedPodcasts, setLikedPodcasts] = useState([]); // State to store liked podcasts

  // Function to fetch podcast data based on ID
  const getdata = async (p) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/podcasts/Podcast/${p}`);
      return result.data; // Return the podcast data
    } catch (err) {
      console.error("Error fetching podcast data:", err);
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get("http://localhost:8080/api/user/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);

        // Fetch liked podcasts data
        if (response.data.user.likedPodcasts) {
          const podcastsData = await Promise.all(
            response.data.user.likedPodcasts.map(podcastId => getdata(podcastId))
          );
          setLikedPodcasts(podcastsData.filter(podcast => podcast)); // Filter out any null responses
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSectionChange = (section) => {
    setSection(section); // Update the current section
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
        <button onClick={() => handleSectionChange("liked")}>Liked</button>
        <button onClick={() => handleSectionChange("saved")}>Saved/Playlist</button>
        <button onClick={() => handleSectionChange("ownPodcast")}>Own Podcast</button>
      </div>

      {section === "liked" && likedPodcasts.length > 0 ? ( // Check for the current section
        <div>
          <h2 className="text-2xl font-bold mt-5">Liked Podcasts:</h2>
          {likedPodcasts.map((podcast, index) => (
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
    </>
  );
}

export default Profile;
