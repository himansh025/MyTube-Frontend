import React from "react";
import { IoMdCreate, IoMdHome, IoMdLogIn } from "react-icons/io";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaThList } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  console.log("is user? for sidebar",user);
  return (
    <div className="fixed h-screen w-24 left-0 z-10 bg-gray-950">
      <div className="text-white text-3xl flex flex-col gap-5 w-full p-2 items-center">
        {/* Home */}
        <div className="flex flex-col items-center mb-4">
          <Link to="/">
            <IoMdHome />
          </Link>
          <div className="font-semibold text-sm">Home</div>
        </div>

        {status ? (
          <>
            {/* Upload Video */}
            <div className="flex flex-col items-center mb-4">
              <Link to="/UploadVideo">
                <MdVideoCall className="text-4xl text-violet-600" />
              </Link>
              <div className="font-semibold text-sm">Upload</div>
            </div>


       

            {/* Subscribed */}
            <div className="flex flex-col items-center mb-4">
              <Link to="/subscribed">
                <FaThList />
              </Link>
              <div className="font-semibold text-sm">Subscribed</div>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center mb-4">
              <Link to={`/creatorProfile/${user.username}`}>
                <CgProfile />
              </Link>
              <div className="font-semibold text-sm">Profile</div>
            </div>

            {/* Logout */}
            <div className="flex flex-col items-center mb-4">
              <Link to="/logout">
                <CgLogOut />
              </Link>
              <div className="font-semibold text-sm">Logout</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Login */}
            <div className="flex flex-col items-center">
              <Link to="/login">
                <IoMdLogIn />
              </Link>
              <div className="font-semibold text-sm">Login</div>
            </div>

            {/* Signup */}
            <div className="flex flex-col items-center">
              <Link to="/signup">
                <IoMdCreate />
              </Link>
              <div className="font-semibold text-sm">Signup</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
