import axios from 'axios'
import { token} from '../constants'

const toggleVideoLike = async(videoId)=>{
    console.log("toggle video",videoId);
    
    try {
        const response = await axios.post(`/api/v1/likes/toggle/${videoId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching ctoggle video like:', error);
    }
}

const toggleCommentLike = async(commentId)=>{
    try {
        const response = await axios.get(`/api/v1/like/toggleCommentLike/${commentId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching ctoggle comment like:', error);
    }
}

const toggleTweetLike = async(tweetId)=>{
    try {
        const response = await axios.get(`/api/v1/like/toggleTweetLike/${tweetId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching toggle tweet like:', error);
    }
}

const getLikedVideos = async()=>{
    try {
        const response = await axios.get(`/api/v1/like/getLikedVideos`,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching getting all liked videos', error);
    }
}

const getLikesOfVideoById = async(videoId)=>{
    // console.log("videoid like fetch",videoId);
    
    try {
        const response = await axios.get(`/api/v1/likes/likedvideosbyid/${videoId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log("backend fetch req of like",response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching getting likes of the video', error);
    }
}

const getLikesOfCommentById = async(commentId)=>{
    try {
        const response = await axios.get(`/api/v1/like/getLikesOfCommentById/${commentId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching getting likes of the video', error);
    }
}

const getLikesOfTweetById = async(tweetId)=>{
    try {
        // console.log(tweetId)
        const response = await axios.get(`/api/v1/like/getLikesOfTweetById/${tweetId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching getting likes of the video', error);
    }
}

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
    getLikesOfVideoById,
    getLikesOfCommentById,
    getLikesOfTweetById
}