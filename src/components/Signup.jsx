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
    // Create a new FormData object
    const formData = new FormData();

    // Append each form field to the FormData object
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('fullname', data.fullname);
    formData.append('password', data.password);

    // Check if avatar and coverimage files exist before appending
    if (data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }
    if (data.coverimage.length > 0) {
      formData.append('coverimage', data.coverimage[0]);
    }

    console.log('FormData:', formData); // Debugging: log the formData

    // Send the FormData to the backend
    const userData = await registerUser(formData);

    if (userData) {
      localStorage.setItem('accessToken', userData.data.accesstoken);
      localStorage.setItem('refreshToken', userData.data.refreshtoken);
      const user = userData.data;
      const obj = {
        user,
      };
      dispatch(login(obj));
      navigate('/login'); // Navigate to login on successful signup
    }
  };

  const handleclick = () => {
    navigate('/login'); // Navigate to login when the user has an account
    console.log('clicked');
  };

  return (
    <div className="mt-[50px] p-4 w-[80%] border-gray-600 border-2 signup md:w-[550px] text-white mx-auto flex flex-col items-center justify-center px-auto rounded-3xl">
      <div className="flex justify-center items-center font-semibold m-4 gap-2 text-2xl">
        SignUp
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col item-center">
        <Inputfield
          placeholder="Enter your username"
          name="username"
          type="text"
          label="Username:"
          register={register}
          required
        />
        <Inputfield
          placeholder="Enter your email"
          name="email"
          type="email"
          label="Email:"
          register={register}
          required
        />
        <Inputfield
          placeholder="Enter your name"
          name="fullname"
          type="text"
          label="FullName:"
          register={register}
          required
        />
        <Inputfield
          placeholder="Enter your password"
          name="password"
          type="password"
          label="Password:"
          register={register}
          required
        />
        <Inputfield
          placeholder="Upload your avatar"
          name="avatar"
          type="file"
          label="Avatar:"
          register={register}
          required
        />
        <Inputfield
          placeholder="Upload your cover image"
          name="coverimage"
          type="file"
          label="Cover Image:"
          register={register}
        />
        <Button className="my-4" content="SignUp" type="submit" />
        <button
          className="bg-blue-500 rounded-md p-2 px-4 mx-auto"
          onClick={handleclick}
          type="button" // Ensure the button is not submitting the form
        >
          have an account
        </button>
      </form>
    </div>
  );
}

export default Signup;
