import axios from 'axios'

const toggleSubscription = async(channelId)=>{
    try {
        
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/v1/subs/togglesubs/${channelId}` ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching while toggle subscription:', error);
    }
}

const getUserChannelSubscribers = async(channelId)=>{
    try {
        
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/v1/subs/getsubs/${channelId}`  ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching get user channel subscribers:', error);
    }
}

const getSubscribedChannels = async(channelId)=>{
    try {
        const token = localStorage.getItem('accessToken');
        // console.log(token)
        const response = await axios.get(`/api/v1/subs/getsubchannel/${channelId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching get subscribed channels:', error);
    }
}

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}