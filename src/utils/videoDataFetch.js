import axios from "axios";

// Fetch all videos with pagination and query options
const getAllVideos = async ({ p, l, q, sb, st, u }) => {
  try {
    const query = q ? q : null;
    const page = p ? p : 1;
    const limit = l ? l : 2;
    const sortBy = sb ? sb : null;
    const sortType = st ? st : null;
    const userId = u ? u : null;

    const token = localStorage.getItem("accessToken");
// console.log(token);

    const response = await axios.get(
      `/api/videos/getallvideos`,
      { param: { page, limit, query, sortBy, sortType, userId } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all videos data:", error);
  }
};



// Fetch a user's channel profile by username
const getUserChannelProfile = async (username) => {
  try {
    console.log("username",username);
    
    const response = await axios.get(`/api/users/current-user/${username}`);
    console.log("response",response);
    
    return response.data;

  } catch (error) {
    console.error("Error fetching user channel profile:", error);
  }
};

const incrementView = async (videoId) => {
  try {
    const response = await fetch(`/api/videos/incrementView/${videoId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to increment view count');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

 const getAVideo = async (videoId) => {
  // console.log("video fetch id",videoId);
  
  try {
    const response =await axios.get(`/api/videos/getvideobyid/${videoId}`);
    // console.log( "single v",response);
    
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const publishVideo = async (data) => {
  const token = localStorage.getItem("accessToken");
  // console.log("Token:", token);

  try {
    // console.log("Video data:", data); 
    const formData = new FormData();
formData.append("videofile", data.videofile[0]);
formData.append("thumbnail", data.thumbnail[0]);
formData.append("title", data.title);
formData.append("description", data.description);
// formData.append("isPublished",data.isPublished);
// console.log(formData);

    
// this give the error 
    // Create a new FormData object
//     console.log("Videofile:", formData.videofile[0]);
// console.log("Thumbnail:", formData.thumbnail[0]);

    const response = await axios.post(`/api/videos/addvideo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    });

    // console.log("Video uploaded successfully:", response);
    return response;
  } catch (error) {
    console.log(error);
    
    // console.error("Error uploading video:", error.response ? error.response : error.message);
    return null;
  }
};

// src/utils/videoDataFetch.js

 const updateThumbnail = async (videoId, thumbnailData) => {
  try {
    const response = await fetch(`/api/videos/${videoId}/thumbnail`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thumbnailData),
    });
    if (!response.ok) throw new Error('Failed to update thumbnail');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
 const updateVideo = async (videoId, videoData) => {
  try {
    const response = await fetch(`/api/videos/${videoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      throw new Error('Failed to update video');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating video:', error);
    return null;
  }
};

// Ensure other exports are correctly handled



export { getAllVideos,updateVideo,updateThumbnail,getAVideo,publishVideo, incrementView, getUserChannelProfile };