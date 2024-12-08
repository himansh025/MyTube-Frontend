import React, { useEffect, useState, useRef } from "react";
import Button from "../components/Button";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import ShowToast from "../components/ShowToast";
import {
  getCurrentUser,
  getUserChannelProfile,
  updateCoverImage,
  updateUserAvatar,
} from "../utils/userDataFetch";

const CreatorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [reload, setReload] = useState(0);
  const { username } = useParams();
  const navigate = useNavigate();

  // Refs for file inputs
  const coverImageRef = useRef(null);
  const avatarRef = useRef(null);

  const fetchData = async () => {
    try {
      if (username) {
        const response = await getUserChannelProfile(username);
        setProfileData(response.data);
        console.log(response.data._id);

        const owner = await getCurrentUser();
        console.log(owner.data._id);
        if (owner && owner.data?._id === response.data._id) {
          setIsOwner(true);
          console.log(isOwner);
        } else {
          setIsOwner(false);
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
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
      ShowToast("update","avatar")
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }
  const handleSubmitCoverImage = async () => {
    const input = document.querySelector("#coverimage");
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverimage", file);

    try {
      const data = await updateCoverImage(formData);
      if (data) setReload((prev) => prev + 1);
      ShowToast("update","coverimage")
    } catch (error) {
      console.error("Error uploading coverImage:", error);
    }
  };
  const openCoverImageUpload = (e) => {
    e.preventDefault();
    document.querySelector("#coverimage").click();
  };
  const openAvatarUpload = (e) => {
    e.preventDefault();
    document.querySelector("#avatar").click();
  }

  useEffect(() => {
    fetchData();
  }, [username, reload]);

  const options = [{ name: "Videos", slug: "my-videos" }];

  return (
    <div className="w-full bg-slate-800">
   <div className="w-full mt-0 overflow-hidden h-96 relative">
  {profileData?.coverimage ? (
    <img
      className="w-full h-full object-fill"
      src={profileData.coverimage}
      alt="Cover image"
    />
  ) : (
    <div className="w-full h-full mt-6 flex items-center justify-center text-white font-semibold">
      No Cover Image
    </div>
  )}
  {isOwner && (
    <>
      <div
        onClick={openCoverImageUpload}
        className="absolute bottom-5 right-5 text-sm cursor-pointer flex items-center space-x-2"
      >
        <FaUserEdit />
        <span className="text-white bg-blue-950 p-2 font-semibold rounded-lg">
          Edit
        </span>
      </div>
      <form hidden>
        <input
          type="file"
          id="coverimage"
          accept="image/*"
          onChange={handleSubmitCoverImage}
        />
      </form>
    </>
  )}
</div>


      <div className="lg:flex pt-0">
      <div className="w-[200px] h-[200px] border-blue-950 border-2 border-solid overflow-hidden rounded-full m-5 relative">
  <img
    className="w-full h-full object-cover"
    src={profileData?.avatar || "/path/to/default/avatar.jpg"}
    alt="Avatar"
  />
  {isOwner && (
    <>
      <div
        onClick={openAvatarUpload}
        className="bg-gray-600 p-1 rounded-xl absolute bottom-5 right-3 text-2xl cursor-pointer"
      >
        <MdEdit />
      </div>
      <form hidden>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleSubmitAvatar}
        />
      </form>
    </>
  )}
</div>



        <div className="flex-1">
          <div className="text-white font-bold text-3xl px-5 pt-3">
            {profileData?.fullname || "User Name"}
          </div>
          <div className="flex gap-3 text-white px-5 py-3 flex-wrap">
            <div>@{(profileData?.username || "username").toUpperCase()}</div>•{" "}
            <div>{profileData?.subscriberscount || 0} subscribers</div>•{" "}
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

      <div className="flex justify-around text-white text-xl font-semibold py-3">
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
