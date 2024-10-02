import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import the cookies library

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    // Remove tokens from cookies
    Cookies.remove('accesstoken');
    Cookies.remove('refreshtoken');

    // Navigate to login page after clearing tokens
    navigate("/login");
  }, [navigate]); // Added the dependency array to ensure it runs only once

  return (
    <div>
      {/* You can add a logout message or loader if desired */}
      Logging out...
    </div>
  );
}

export default Logout;
