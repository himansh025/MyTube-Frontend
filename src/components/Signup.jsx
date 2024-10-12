import React from 'react';
import Inputfield from './Inputfield';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { registerUser } from '../utils/userDataFetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();

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

    const userData = await registerUser(formData);

    if (userData) {
      localStorage.setItem('accessToken', userData.data.accesstoken);
      localStorage.setItem('refreshToken', userData.data.refreshtoken);
      const user = userData.data;
      const obj = {
        user,
      };
      dispatch(login(obj));
      navigate('/login');
    }
  };

  const handleclick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center  justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="p-8 w-full md:w-[550px] bg-gray-900 text-white mx-auto rounded-2xl shadow-lg">
        <h2 className="text-center text-3xl font-bold mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            placeholder="Enter your email"
            name="email"
            type="email"
            label="Email:"
            register={register}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none"
          />
          <Inputfield
            placeholder="Enter your full name"
            name="fullname"
            type="text"
            label="Full Name:"
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
          <Inputfield
            placeholder="Upload your avatar"
            name="avatar"
            type="file"
            label="Avatar:"
            register={register}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none"
          />
          <Inputfield
            placeholder="Upload your cover image"
            name="coverimage"
            type="file"
            label="Cover Image:"
            register={register}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:border-blue-400 focus:outline-none"
          />
          <Button
            content="Sign Up"
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out"
          />
          <button
            className="w-full py-2 mt-4 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out"
            onClick={handleclick}
            type="button"
          >
            Already have an account? Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
