import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserChannelProfile,
  getUserChannelProfilebyusername,
  updateCoverImage,
  updateUserAvatar,
} from "../utils/userDataFetch";

const CreatorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [reload, setReload] = useState(0);
  const { username } = useParams();
  // const user = useSelector((state) => state.auth.user);

  // console.log("user at edit profile",username);

  const check = async (username) => {
    // console.log("inside fnc",username);

    const getchannelowner = await getUserChannelProfile(username);
    // console.log("channel details of v owner",getchannelowner);
    if (getchannelowner.data?.username == username) {
      setIsOwner(true);
    } else {
      console.log("not happen");
    }
  };

  const handleSubmitAvatar = async () => {
    const input = document.querySelector("#avatar");
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const data = await updateUserAvatar(formData);
      if (data) setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleSubmitCoverImage = async () => {
    const input = document.querySelector("#coverImage");
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverimage", file);

    try {
      const data = await updateCoverImage(formData);
      if (data) setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error uploading coverImage:", error);
    }
  };

  const openCoverImageUpload = () =>
    document.querySelector("#coverImage").click();
  const openAvatarUpload = (e) => {
    e.preventDefault();
    document.querySelector("#avatar").click();
  };

  const fetchData = async () => {
    try {
      // console.log(username);

      const response = await getUserChannelProfilebyusername(username);
      // console.log("response hai", response);

      setProfileData(response.data);
      const owner = getCurrentUser();
      if (owner && owner._id === response.data._id) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  // console.log("isowner",isOwner);

  useEffect(() => {
    fetchData();
    check(username);
  }, [username, reload]);

  const options = [
    { name: "Videos", slug: "videos" },
    // { name: "Tweets", slug: "tweets" },
    // { name: "Playlists", slug: "playlists" },
  ];

  return (
    <div className="w-full bg-slate-800">
      <div className="w-full overflow-hidden max-h-44 relative">
        <img
          className="w-full object-cover h-full"
          src={profileData?.coverimage || "/path/to/default/cover.jpg"}
          alt="Cover"
        />
        {isOwner && (
          <div
            onClick={openCoverImageUpload}
            className="absolute h-3 bottom-5  bg-red-500 mb-10 right-5 text-sm cursor-pointer"
          >
            <FaUserEdit />
            <span className="text-white  bg-blue-950 p-1 font-semibold  rounded-lg">
              Edit
            </span>
          </div>
        )}
        <form hidden>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleSubmitCoverImage}
          />
        </form>
      </div>

      <div className="lg:flex pt-0 ">
        <div className="w-[200px] h-[200px] border-blue-950 border-solid border-2 overflow-hidden rounded-full m-5 relative">
          <img
            className="w-full object-cover"
            src={profileData?.avatar || "/path/to/default/avatar.jpg"}
            alt="Avatar"
          />
          {isOwner && (
            <div
              onClick={openAvatarUpload}
              className="bg-gray-600 p-1 rounded-xl absolute bottom-5 right-3 text-2xl cursor-pointer"
            >
              <MdEdit />
            </div>
          )}
          <form hidden>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleSubmitAvatar}
            />
          </form>
        </div>

        <div className="flex-1">
          <div className="text-white font-bold text-3xl px-5 pt-3">
            {profileData?.fullname || "User Name"}
          </div>
          <div className="flex gap-3 text-white px-5 py-3 flex-wrap">
            <div>@{(profileData?.username || "username").toUpperCase()}</div>•
            <div>{profileData?.subscriberscount || 0} subscribers</div>•
            <div>{profileData?.videos?.length || 0} videos</div>
          </div>

          <div className="px-5 flex gap-5 flex-wrap">
            {!isOwner && <Button content="Subscribe" />}
            {isOwner && (
              <>
                <Link to="/dashboard">
                  <Button content="Dashboard" />
                </Link>
                <Link to="/customizeChannel">
                  <Button content="Customize channel" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-around  text-white text-xl font-semibold py-3">
        {options.map((option) => (
          <Link
            key={option.slug}
            to={`/creatorProfile/${profileData?.username}/${option.slug}`}
            className="hover:text-blue-400 transition"
          >
            {option.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center w-full flex-wrap gap-5 py-4 px-3">
        <Outlet />
      </div>
    </div>
  );
};

export default CreatorProfile;
