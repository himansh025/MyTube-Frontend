import React, { useState } from 'react';
import Inputfield from './Inputfield';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { registerUser } from '../utils/userDataFetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { load, stopLoad } from '../store/reloadSlice';
import { toast } from 'react-toastify';

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    setLoading(true);
    dispatch(load());

    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('fullname', data.fullname);
    formData.append('password', data.password);

    if (data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }
    if (data.coverimage.length > 0) {
      formData.append('coverimage', data.coverimage[0]);
    }

    try {
      const userData = await registerUser(formData);

      if (userData) {
        localStorage.setItem('accessToken', userData.data.accesstoken);
        localStorage.setItem('refreshToken', userData.data.refreshtoken);

        const user = userData.data;
        const obj = { user };
        dispatch(login(obj));

        toast.success('Signup successful! Redirecting to login...');

        setTimeout(() => {
          setLoading(false);
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);

      setLoading(false);
      dispatch(stopLoad());
    }
  };

  return (
<div className="flex items-center justify-center bg-slate-600 p-4" style={{ height: 'calc(100vh - 50px)' }}>
  <div className="p-6 w-full md:w-[400px] bg-gray-900 text-white mx-auto rounded-2xl shadow-lg max-h-[700px] overflow-auto">
    <h2 className="text-center text-2xl font-thin mb-6">Create Your Account</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Inputfield
  placeholder="Enter your username"
  name="username"
  type="text"
  label="Username:"
  register={register}
  required
  className="w-full px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
  labelClassName="text-xs" 
/>

<Inputfield
  placeholder="Enter your email"
  name="email"
  type="email"
  label="Email:"
  register={register}
  required
  className="w-full px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
  labelClassName="text-xs" 
/>

<Inputfield
  placeholder="Enter your full name"
  name="fullname"
  type="text"
  label="Full Name:"
  register={register}
  required
  className="w-full px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
  labelClassName="text-xs" 
/>

<Inputfield
  placeholder="Enter your password"
  name="password"
  type="password"
  label="Password:"
  register={register}
  required
  className="w-full px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
  labelClassName="text-xs" 
/>

          <Inputfield
            placeholder="Upload your avatar"
            name="avatar"
            type="file"
            label="Avatar:"
            register={register}
            required
            className="w-full px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
            labelClassName="text-xs" 
          />
          <Inputfield
            placeholder="Upload your cover image"
            name="coverimage"
            type="file"
            label="Cover Image:"
            register={register}
            className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none text-sm"
            labelClassName="text-xs" 
          />
          <Button
            content={loading ? 'Loading...' : 'Sign up'}
            disabled={loading}
            className={`w-full px-3 py-2 mt-2 rounded-lg text-white ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } transition duration-200 ease-in-out`}
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
