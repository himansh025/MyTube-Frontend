import Logo from "./Logo";
import { mainName } from "../constants";
import Inputfield from "./Inputfield";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { CgProfile } from "react-icons/cg";
import { MdVideoCall } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { logoutUser } from "../utils/userDataFetch";
import { MyContext } from "./ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { giveQuery } from "../store/SearchSlice";

const NavBar = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const search =()=>{
    const input = document.getElementById('search').value
    console.log(input)
    const obj = {
      query:input
    }
    dispatch(giveQuery(obj));
  }


  useEffect(() => {
    console.log(userData)
  }, [userData])
  

  const onSubmit = (data) => {};
  const logoutBtn = async () => {
    const logoutData = await logoutUser();
    if (logoutData) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());
      navigate('/login')
    }
  };

  const status = useSelector((state) => state.auth.status);

  return (
    <div className="w-full bg-black text-white  p-3 flex flex-col lg:flex-row justify-center lg:justify-between ">
      
      <div className="flex mb-2 gap-2 font-bold items-center text-xl justify-center w-full ">
        <Link to={"/"} className="flex gap-2 items-center justify-center">
          <Logo /> {mainName}
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center item-center w-full px-9"
      >
        <div className="flex gap-3 mb-3">
          <div className="lg:w-[600px]">
            <Inputfield
              className="flex items-center  justify-center p-3 bg-gray-800 rounded-xl w-[90%] mx-auto sm:w-[250px] md:w-[300px] lg:w-[500px]"
              placeholder="Search"
              name="search"
              type="text"
              id="search"
              register={register}
              // required
            />
          </div>
          {/* write its route */}
          <Link to={"/search"}   >
            <div onClick={search}><Button content="Search" className="p-3 px-4" /></div>
          </Link>
        </div>
      </form>

      <div className="flex  gap-7 justify-around items-center ">
        {status && (
          <Link to={"/home/UploadVideo"}>
            <div className="text-3xl text-blue-90 pb-2 flex items-center justify-center">
              <MdVideoCall />
            </div>
          </Link>
        )}

        {status && (
          <Link to={"/home/PostTweet"}>
            <div className="text-3xl text-white flex justify-center items-center pb-3 font-semibold">
              <IoMdAddCircle />
            </div>
          </Link>
        )}

        {status && (
          <Link to={`/home/creatorProfile/${userData.username}`}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center w-[30px] border-white text-white rounded-full overflow-hidden">
                <img
                  className="object-fit w-full h-full"
                  src={userData.avatar}
                  alt=""
                />
              </div>
              <div className="p-0 text-xs font-semibold">You</div>
            </div>
          </Link>
        )}

        {status ? (
          <div onClick={logoutBtn}>
            <Button content="Logout" />
          </div>
        ) : (
          <div className="flex item-center justify-center">
            <Link to={"/login"}>
              <Button content="Login" />
            </Link>
            <div className="pt-4 flex items-center justify-center mx-4 pb-3">or</div>
            <Link to={`/signup`}>
              <Button content="Signup" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
