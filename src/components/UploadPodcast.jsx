import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UploadPodcast = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!audioFile || !imageFile) {
      setError("Both audio and image files are required");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("audioFile", audioFile);
    formData.append("imageFile", imageFile);
  
    try {
      const token = localStorage.getItem("token");  
      const response = await axios.post(
        "https://podcastapp-back-end.onrender.com/api/podcasts/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setSuccess(response.data.message);
      setError(null);
  
      if (response.data.message === "Podcast uploaded successfully") {
        navigate("/Home");
        setTitle("");
        setAuthor("");
        setAudioFile(null);
        setImageFile(null);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 p-8 space-y-6 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Upload Podcast
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
          enctype="multipart/form-data"
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Podcast title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Author
              </label>
              <input
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter author's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Audio File
              </label>
              <input
                name="audioFile"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Image File
              </label>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Podcast
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Need to go back?{" "}
            <Link
              to="/Home"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Go Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPodcast;
