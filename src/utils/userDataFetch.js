import axios from 'axios'
// import { mainName , request} from '../constants'
const registerUser = async (formData) => {
  console.log(formData);

  try {
    const response = await axios.post(`/api/users/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user. Please try again.');
  }
};



const loginUser = async(formData)=>{
    try {

        // console.log("formdata",formData)
        const response = await axios.post(`/api/users/login` , formData , {
            withCredentials: true, // Include cookies
          });  
        // console.log("response",response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching login data:', error);
    }
}

const logoutUser = async()=>{
    try {
      const token = localStorage.getItem('accessToken');
      // console.log(document.cookie.includes('accessToken'))
      // console.log(token)
        // console.log(formData)
        const response = await axios.post(`/api/users/logout` , {token} ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching logout data:', error);
    }
}


const refreshAccessToken = async()=>{
  try {
      const token = localStorage.getItem('refreshToken');
      // console.log(token)
      // console.log(formData)
      const response = await axios.post(`/api/users/refreshtoken`,{ headers: { Authorization: `Bearer ${token}`}});  
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching logout data:', error);
  }
}



const changePassword = async(data)=>{
    try {
        const token = localStorage.getItem('accessToken');
        // console.log(data)
        const response = await axios.post(`/api/users/change-password` , data ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching changePassword data:', error);
    }
}


const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    
    // Check if token exists
    if (!token) {
      throw  new Error('No access token found');
    }
    
    // Make the API request with authorization header
    const response = await axios.get('/api/users/current-user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // console.log('Current user data:', response);
    return response.data;

  } catch (error) {
    // Improved error handling
    console.error('Error fetching current user data:', error.response?.data || error.message);
    // throw error; // Optional: rethrow the error if you need to handle it elsewhere
  }
};



const userId = async (userId) => {
  try {
    console.log("userId:", userId);
    
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`/api/users/m/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });  
    console.log("Response data:", response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Optional: re-throw to handle it elsewhere
  }
};


const getUserById = async (userId) => {
  try {
    console.log("userId:", userId);
    
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`/api/users/c:${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });  
    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    // console.error('Error fetching user data:', error);
    throw error; // Optional: re-throw to handle it elsewhere
  }
};

const updateAccountDetails = async(data)=>{
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(`/api/users/update-account` , data ,{ headers:
           {
             Authorization: `Bearer ${token}`
            }
          }
        );  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching updateAccountDetails data:', error);
    }
}

const updateUserAvatar = async (data)=>{
    try {
      const token = localStorage.getItem('accessToken');
        const response = await axios.patch(`/api/users/avatar` , data ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching updateUserAvatar data:', error);
    }
}

const updateCoverImage = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await axios.patch(
      `/api/users/update-cover`,  // Fixed URL path
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'  // Ensure Content-Type is correctly set
        }
      }
    );
    
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating cover image:', error);
  }
}


const getUserChannelProfile = async (username) => {
  // console.log("username for channelprofile to get user channel detials",userid);
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`/api/users/c/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log('userchannel detil fetch success:', response.data);
    return response.data; // Assuming response.data contains the desired data
  } catch (error) {
    console.log('Error fetching user channel profile:', error);

  
  }
};


const getUserChannedetails=async(username)=>
{
  try {
    const token = localStorage.getItem('accessToken');
// console.log(token);
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`/api/users/c/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('userchannel detil fetch success:', response.data);
    return response.data; // Assuming response.data contains the desired data
  } catch (error) {
    console.log('Error fetching user channel profile:', error);

  
   } }



const getUserChannelProfilebyusername = async (username) => {
  // console.log("username for channelprofile",username);
  try {
    const token = localStorage.getItem('accessToken');
// console.log(token);
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`/api/users/only/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log('userchannel detil fetch success:', response.data);
    return response.data; // Assuming response.data contains the desired data
  } catch (error) {
    console.log('Error fetching user channel profile:', error);

  
  }
};



const getWatchHistory = async ()=>{
    try {
        // console.log(data)
      const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/users/history`,{ headers: { Authorization: `Bearer ${token}`}});  
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching watch history:', error);
    }
}

export {
 
    loginUser,
    logoutUser,
    registerUser,
    changePassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    refreshAccessToken,
    getUserById,
    getUserChannedetails,
    getUserChannelProfilebyusername,
    userId
}