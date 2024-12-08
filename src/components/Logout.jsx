import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import the cookies library

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    // Remove cookies by specifying path and domain (if needed)
    Cookies.remove('accessToken', { path: '/' });  // Added path
    Cookies.remove('accesstoken', { path: '/' });  // Corrected name and path
    Cookies.remove('refreshToken', { path: '/' }); // Added path

    // If you have secure cookies or specific domain setup, include those:
    Cookies.remove('accessToken', { path: '/', domain: 'localhost' });
    Cookies.remove('refreshToken', { path: '/', domain: 'localhost' });

    // Navigate to the login page after clearing tokens
    navigate("/login");
  }, [navigate]); // Dependency array to run only once when the component mounts

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
