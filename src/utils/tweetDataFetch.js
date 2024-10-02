import axios from 'axios'
import { mainName , request} from '../constants'

const createTweet = async(data)=>{
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/tweets/createTweet` , data,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching create tweet data:', error);
    }
}

const getUserTweets = async(username)=>{
    try {
        const response = await axios.get(`/api/tweets/getUserTweets/${username}`);  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching getting user  tweet data:', error);
    }
}

const updateTweet = async(tweetId , data)=>{
    try {
        console.log(data)
        const token = localStorage.getItem('accessToken');
        const body = {
            ...data,
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        
        console.log(body)
        // const response = await axios.get(`/api/tweets/updateTweet/${tweetId}` ,{...data , headers:{
        //     Authorization:`Bearer ${token}`
        // }});  
        const response = await fetch(`/api/tweets/updateTweet/${tweetId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });

        const res = await response.json();
        // console.log(await response.json());
        console.log(res.data)
        return res.data;
      } catch (error) {
        console.error('Error fetching updating tweet data:', error);
    }
}

const deleteTweet = async(tweetId)=>{
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`/api/tweets/deleteTweet/${tweetId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching deleting   tweet data:', error);
    }
}

const getTweetById = async(tweetId)=>{
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/tweets/getTweetById/${tweetId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching getTweetById   tweet data:', error);
    }
}

export {
    createTweet ,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getTweetById
}