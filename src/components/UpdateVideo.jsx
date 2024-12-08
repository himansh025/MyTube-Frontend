import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAVideo, updateVideo } from "../utils/videoDataFetch";
import { FaRegEdit, FaFileUpload, FaPhotoVideo } from "react-icons/fa"; // Colorful icons for UI

const UpdateVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({
    title: "",
    description: "",
    thumbnail: null,
    vidoefile: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  console.log("video id", id);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await getAVideo(id);
        setVideo(response.data);
      } catch (error) {
        setError("Failed to fetch video data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Logging to check the state before submitting
    
    if (!video.title || !video.description) {
      setError("Title and Description are required.");
      return;
    }
    
    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.description);
    
    // Only append thumbnail if it's selected
    if (video.thumbnail) {
      formData.append("thumbnail", video.thumbnail);
    }
    
    // Only append video file if it's selected
    if (video.vidoefile) {
      formData.append("videofile", video.vidoefile);
    }
    
    // Log FormData to check if files are appended
    console.log("FormData:", formData);
    console.log("Video Data to Submit:", video);

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      await updateVideo(id, video);
      setSuccess("Video updated successfully!");
      setTimeout(() => navigate(`/videos/${id}`), 2000); // Redirect after success
    } catch (error) {
      setError("Error updating video.");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setVideo({ ...video, thumbnail: file });
    console.log("Thumbnail selected:", file); // Log selected thumbnail
  };

  const handlevideofileChange = (e) => {
    const file = e.target.files[0];
    setVideo({ ...video, vidoefile: file });
    console.log("Video file selected:", file); // Log selected video file
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg max-w-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Edit Video</h1>

      {loading && <div className="text-center text-white">Loading...</div>}
      {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-3 rounded-lg mb-4">{success}</div>}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="relative">
          <label htmlFor="title" className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <FaRegEdit className="text-blue-500 text-lg" />
            Video Title
          </label>
          <input
            type="text"
            id="title"
            value={video.title}
            onChange={(e) => setVideo({ ...video, title: e.target.value })}
            placeholder="Enter Video Title"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="description" className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <FaRegEdit className="text-blue-500 text-lg" />
            Video Description
          </label>
          <textarea
            id="description"
            value={video.description}
            onChange={(e) => setVideo({ ...video, description: e.target.value })}
            placeholder="Enter Video Description"
            rows="5"
            className="w-full p-2 bg-gray-800 text-sm text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="thumbnail" className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <FaPhotoVideo className="text-green-500 text-lg" />
            Video Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="videofile" className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <FaFileUpload className="text-green-500 text-lg" />
            Video File
          </label>
          <input
            type="file"
            id="videofile"
            onChange={handlevideofileChange}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 text-white rounded-lg font-semibold ${loading ? "bg-blue-500 cursor-not-allowed opacity-50" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Video"}
        </button>
      </form>
    </div>
  );
};

export default UpdateVideo;
