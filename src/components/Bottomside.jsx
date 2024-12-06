import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdLogIn } from "react-icons/io";

// import { IoMdAddCircle } from "react-icons/io";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import { MdVideoFile } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Bottomside = () => {
  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState("");
console.log("is user? for bottomside",user);


  useEffect(() => {
    if (user && user.avatar) {
      setProfile(user.avatar);
    }
  }, [user]);

  return (
    <div className="w-full flex  bg-gray-900 z-90">
      <div className="text-white text-2xl flex  w-full justify-around items-center">
        <div className="flex flex-col  items-center">
          <Link to="/">
            <IoMdHome />
          </Link>
          <div className="font-semibold text-sm">Home</div>
        </div>
        {status ? (
          <>
            <div className="text-3xl text-violet-300  flex items-center justify-center">
              <Link to="/UploadVideo">
                <MdVideoFile />
                <p className="text-sm">Upload</p>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link to="/subscribed">
                <FaRegListAlt />
              </Link>
              <div className="font-semibold text-sm">Subscribed</div>
            </div>

            <div className="flex flex-col items-center">
              <Link to={`/creatorProfile/${user.username}`}>
                <img
                  src={profile}
                  className="h-8 rounded-sm w-8"
                  alt={`${user.username}'s avatar`}
                />
              </Link>
              <div className="font-semibold text-sm">{user.fullname}</div>

          
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Link to="/login">
              <IoMdLogIn />
            </Link>
            <div className="font-semibold text-sm">Login</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bottomside;
