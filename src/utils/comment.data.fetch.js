import axios from 'axios'
import { token} from '../constants'
// import apiUrl from '../config';
const apiUrl = import.meta.env.VITE_API_URL;

const getVideoComments = async(videoid )=>{
    try {
        // console.log("comment fetch",params);
        
        const response = await axios.get(`${apiUrl}/api/v1/comments/allcomments/${videoid}`);  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching getting video comments', error);
    }
}

const addComment = async(commentid , data)=>{
    try {
        const body = {
            ...data,
            headers: { Authorization: `Bearer ${token}`}
        }
        console.log(body)
        const response = await axios.post(`${apiUrl}/api/v1/comments/addcomment/${commentid}` ,data , {headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching adding comment', error);
    }
}

const updateComment = async(commentId , data)=>{
    try {
        const response = await axios.post(`${apiUrl}/api/v1/comment/updateComment/${commentId}` ,data ,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching updating comment', error);
    }
}

const deleteComment = async()=>{
    try {
        const response = await axios.post(`${apiUrl}/api/v1/comment/deleteComment/${commentId}`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching deleting comment', error);
    }
}

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}