import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { publishVideo } from '../utils/videoDataFetch.js';
import ShowToast from './ShowToast.jsx';


const VideoUploadComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    console.log("Videofile:", data.videofile[0]);
    console.log("Thumbnail:", data.thumbnail[0]);

    const videoData = await publishVideo(data);
    console.log(videoData);
ShowToast("upload","video")

  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10  bg-gray-900 rounded-lg border-2 border-gray-500 shadow-xl  p-2 md:p-8" >
      <h2 className="text-3xl font-extrabold mb-8 text-white text-center">Upload Your Video</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white p-8 rounded-lg shadow-md">
        
        {/* Video Title */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter video title"
          />
        </div>

        {/* Video Description */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter video description"
            rows="4"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleThumbnailChange}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-4 w-40 h-24 object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Video File Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Video Content</label>
          <input
            type="file"
            accept="video/*"
            {...register('videofile', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUploadComponent;