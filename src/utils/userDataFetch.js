import axios from 'axios'
// import { mainName , request} from '../constants'
const apiUrl = import.meta.env.VITE_API_URL;

const registerUser = async (formData) => {
  console.log(formData);

  try {
    const response = await axios.post(`${apiUrl}/api/v1/users/register`, formData, {
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



const loginUser = async (formData) => {
  try {
    console.log("Login form data:", formData);

    const response = await axios.post(
      `${apiUrl}/api/v1/users/login`, 
      formData, 
      { withCredentials: true }
    );

    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      alert(error.response.data.message || "An error occurred. Please try again.");
    } else if (error.request) {
      console.error("No response from server:", error.request);
      alert("No response from the server. Please check your connection.");
    } else {
      console.error("Error in request setup:", error.message);
      alert("An unexpected error occurred.");
    }
  }
};

const logoutUser = async()=>{
    try {
      const token = localStorage.getItem('accessToken');
      // console.log(document.cookie.includes('accessToken'))
      // console.log(token)
        // console.log(formData)
        const response = await axios.post(`${apiUrl}/api/v1/users/logout` , {token} ,{ headers: { Authorization: `Bearer ${token}`}});  
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
      const response = await axios.post(`${apiUrl}/api/v1/users/refreshtoken`,{ headers: { Authorization: `Bearer ${token}`}});  
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
        const response = await axios.post(`${apiUrl}/api/v1/users/change-password` , data ,{ headers: { Authorization: `Bearer ${token}`}});  
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
    const response = await axios.get(`${apiUrl}/api/v1/users/current-user`, {
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



const userIdowner = async (userId) => {
  try {
    console.log("userId:", userId);
    
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${apiUrl}/api/v1/users/m/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });  
    // console.log("Response data:", response);
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
    const response = await axios.get(`${apiUrl}/api/v1/users/c:${userId}`, {
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
      console.log("fetch data",data);
      
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(`${apiUrl}/api/v1/users/update-account`, data ,{ headers:
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
      console.log("cover data",data);
      const token = localStorage.getItem('accessToken');
        const response = await axios.patch(`${apiUrl}/api/v1/users/update-avatar` , data ,{ headers: { Authorization: `Bearer ${token}`}});  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching updateUserAvatar data:', error);
    }
}

const updateCoverImage = async (data) => {
  try {
    console.log("cover data",data);
    
    const token = localStorage.getItem('accessToken');
    
    const response = await axios.patch(
      `${apiUrl}/api/v1/users/update-cover`,  // Fixed URL path
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

    const response = await axios.get(`${apiUrl}/api/v1/users/c/${username}`, {
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

    const response = await axios.get(`${apiUrl}/api/v1/users/c/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('userchannel detil fetch success:', response.data);
    return response.data; // Assuming response.data contains the desired data
  } catch (error) {
    console.log('Error fetching user channel profile:', error);

  
   } }



const getUserChannelsdetailsbyuserid = async (videoid) => {
  // console.log("username for channelprofile",username);
  try {
    const token = localStorage.getItem('accessToken');
// console.log(token);
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`${apiUrl}/api/v1/users/only/${videoid}`, {
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
        const response = await axios.get(`${apiUrl}/api/v1/users/history`,{ headers: { Authorization: `Bearer ${token}`}});  
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
    getUserChannelsdetailsbyuserid,
    userIdowner
}