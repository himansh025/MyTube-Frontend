import axios from 'axios'
import { token} from '../constants'
// import apiUrl from '../config';
const apiUrl = import.meta.env.VITE_API_URL;

const getChannelStats = async()=>{
    try {
        // console.log("check dashboard");
        
        const response = await axios.get(`${apiUrl}/api/v1/dashboard/getChannelStats`,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching toggle video like:', error);
    }
}

const getChannelVideos = async()=>{
    try {
        const response = await axios.post(`${apiUrl}/api/v1/dashboard/getChannelVideos`,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching toggle video like:', error);
    }
}

export {
    getChannelStats,
    getChannelVideos
}