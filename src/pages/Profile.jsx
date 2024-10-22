import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavBar from "../components/ProfileNavBar";
function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(
          "http://localhost:8080/api/user/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

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
      <ProfileNavBar />
    </>
  );
}

export default Profile;
