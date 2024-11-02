import React, { useEffect, useState } from "react";
import { FaUserEdit, FaEnvelope } from "react-icons/fa"; // Icons for inputs
import { useForm } from "react-hook-form";
import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { updateAccountDetails } from "../utils/userDataFetch";
import { useNavigate } from "react-router-dom";

const CustomizeChannel = () => {
  const { register, handleSubmit } = useForm();
  const user = useSelector((state) => state.auth.user);
  const [reload, setreload] = useState(0);
  const navigate = useNavigate();

  // console.log("user", user);

  const updateDetails = (data) => {
    if (data.fullname === "") {
      data.fullname = user.fullname;
    }
    if (data.email === "") {
      data.email = user.email;
    }
    const dataInfo = async () => {
      console.log("data",data);
      
      const accountInfo = await updateAccountDetails(data);
      if (accountInfo) {
        navigate(`/creatorProfile/${user.username}`);
      }
    };
    dataInfo();
  };

  useEffect(() => {}, [reload]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 py-10">
      <div className="font-bold text-4xl text-blue-600 mb-5">Edit Profile</div>
      <form
        onSubmit={handleSubmit(updateDetails)}
        className="flex flex-col items-center gap-6 w-[90%] md:w-[50%] bg-white p-8 shadow-lg rounded-lg"
      >
        <div className="flex items-center gap-3 w-full">
          <FaUserEdit className="text-blue-500 text-2xl" />
          <Inputfield
            placeholder="Enter your full name"
            className="flex-1 p-2 border border-gray-300 rounded-md"
            type="text"
            name="fullname"
            register={register}
            required
          />
        </div>
        <div className="flex items-center gap-3 w-full">
          <FaEnvelope className="text-blue-500 text-2xl" />
          <Inputfield
            placeholder="Enter your email"
            className="flex-1 p-2 border border-gray-300 rounded-md"
            type="text"
            name="email"
            register={register}
            required
          />
        </div>
        <Button
          type="submit"
          content="Submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
        />
      </form>
    </div>
  );
};

export default CustomizeChannel;
