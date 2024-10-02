import axios from 'axios'
import { mainName , request , token} from '../constants'

const getChannelStats = async()=>{
    try {
        const response = await axios.post(`/api/dashboard/getChannelStats`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching ctoggle video like:', error);
    }
}

const getChannelVideos = async()=>{
    try {
        const response = await axios.post(`/api/dashboard/getChannelVideos`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching ctoggle video like:', error);
    }
}

export {
    getChannelStats,
    getChannelVideos
}