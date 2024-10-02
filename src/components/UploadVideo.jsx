import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { publishVideo } from '../utils/videoDataFetch.js';

const VideoUploadComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const onSubmit = async(data) => {
    // preventDeafult()
    console.log(data);
    console.log("Videofile:", data.videofile[0]);
console.log("Thumbnail:", data.thumbnail[0]);

const videoData = await publishVideo(data);
// if(videoData){
//   // setresult("Video Uploaded Successfully ✅");

// }
// else{
//   setresult("Something went wrong while uploading   ")
// }
// setuploaded(true);
console.log(videoData)
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter video title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter video description"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-s  m font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail', { required: true })}
            className="w-full px-3 py-2 border rounded"
            onChange={handleThumbnailChange}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-20 object-cover"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Video Content</label>
          <input
            type="file"
            accept="video/*"
            {...register('videofile', { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUploadComponent;
