import axios from 'axios'
import { mainName , request , token} from '../constants'

const createPlaylist = async(data)=>{
    try {
        const response = await axios.post(`/api/v1/playlist/createPlaylist` , data,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching create tweet data:', error);
    }
}

const getUserPlaylists = async(userId)=>{
    try {
        console.log(userId)
        const response = await axios.get(`/api/v1/playlist/getUserPlaylists/${userId}`);  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching create tweet data:', error);
    }
}

const getPlaylistById  = async(playlistId)=>{
    try {
        const response = await axios.get(`/api/v1/playlist/getPlaylistById/${playlistId}`);  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching get playlist by id', error);
    }
}

const addVideoToPlaylist = async(playlistId, videoId)=>{
    try {
        const response = await axios.get(`/api/v1/playlist/addVideoToPlaylist/${playlistId}/${videoId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching adding video to playlist', error);
    }
}

const removeVideoFromPlaylist = async(playlistId, videoId)=>{
    try {
        const response = await axios.get(`/api/v1/playlist/removeVideoFromPlaylist/${playlistId}/${videoId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching removing video to playlist', error);
    }
}

const deletePlaylist = async(playlistId)=>{
    try {
        const response = await axios.get(`/api/v1/playlist/deletePlaylist/${playlistId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching adeleting playlist', error);
    }
}

const updatePlaylist = async(playlistId , data)=>{
    try {
        const response = await axios.get(`/api/v1/playlist/updatePlaylist/${playlistId}` , data,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching updating playlist', error);
    }
}

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}