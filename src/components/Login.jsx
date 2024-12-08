import React, { useEffect, useState } from 'react';
import Inputfield from './Inputfield';
import { useForm } from "react-hook-form";
import Button from './Button';
import { loginUser } from '../utils/userDataFetch';
import { login } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { load, stopLoad } from '../store/reloadSlice';

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("jbkkhbm");
  Cookies.set('accessToken', accessToken);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
  }, [accessToken]);

    const handleclick = () => {
    navigate('/signup');
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    dispatch(load());

    try {
      const userdata = await loginUser(data);
      // console.log("userlogin",userdata);
      
      if (userdata) {
        localStorage.setItem('accessToken', userdata.data.accesstoken);
        localStorage.setItem('refreshToken', userdata.data.refreshtoken);
        const user = userdata.data.user;
        // console.log("user",user);
        
        dispatch(login({ user }));
        navigate('/');
      } else {
        setLoading(false);
        alert("Login failed. Please check your credentials.");
        navigate('/login');
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      alert("An error occurred during login. Please try again.");
    } finally {
      dispatch(stopLoad());
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-600'>
      <div className='p-8 w-[90%] md:w-[400px] bg-gray-900 text-white mx-auto rounded-2xl shadow-xl'>
        <div className='text-center text-3xl font-bold mb-6'>
          Welcome Back
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Inputfield 
            placeholder="Enter your username" 
            name="username" 
            type="text" 
            label="Username:" 
            register={register} 
            required 
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none"
          />
          <Inputfield 
            placeholder="Enter your password" 
            name="password" 
            type="password" 
            label="Password:" 
            register={register} 
            required 
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none"
          />
          <Button 
            content={loading ? 'Logging in...' : 'Submit'} 
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200 ease-in-out`}
          />
          
        </form>
           <button
            className="w-40 py-2 mt-4 translate-x-2/4 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out"
            onClick={handleclick}
            type="button"
          >
            Creat account
          </button>
      </div>
    </div>
  );
}

export default Login;
