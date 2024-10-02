import React, { useEffect, useState } from 'react';
import { mainName } from '../constants';
import Logo from './Logo';
import Inputfield from './Inputfield';
import { useForm } from "react-hook-form";
import Button from './Button';
import axios from 'axios';
import { registerUser, loginUser } from '../utils/userDataFetch';
import { login, logout } from '../store/authSlice';
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
    // Add any needed side-effects for accessToken here.
  }, [accessToken]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    dispatch(load());

    try {
      const userdata = await loginUser(data);

      if (userdata) {
        // Save tokens and update user state on successful login
        localStorage.setItem('accessToken', userdata.data.accesstoken);
        localStorage.setItem('refreshToken', userdata.data.refreshtoken);
        const user = userdata.data.user;

        dispatch(login({ user }));
        navigate('/');
      } else {
        // If userdata is null or undefined, handle it as a failed login
        setLoading(false);
        alert("Login failed. Please check your credentials.");
        navigate('/login');
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Login error:", error);
      setLoading(false);
      alert("An error occurred during login. Please try again.");
    } finally {
      // Stop loading regardless of success or failure
      dispatch(stopLoad());
      setLoading(false);
    }
  };

  return (
    <div className='p-4 w-[90%] bg-black md:w-[550px] text-white mx-auto flex flex-col items-center justify-center px-auto rounded-3xl'>
      <div className='flex justify-center items-center font-extrabold gap-2 text-2xl'>
        {/* <Logo/>{mainName} */}
      </div>
      <div className='flex justify-center items-center font-semibold m-4 gap-2 text-2xl'>
        Login
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col item-center gap-4 flex-wrap'>
        <Inputfield placeholder="Enter your username" name="username" type="text" label="Username:" register={register} required />
        <Inputfield placeholder="Enter your email" name="email" type="text" label="email:" register={register} check required />
        <Inputfield placeholder="Enter your password" name="password" type="password" label="Password:" register={register} required />
        <Button content='Login' className={`${loading ? "bg-gray-900" : ""}`} type="submit" />
      </form>
    </div>
  );
}

export default Login;
