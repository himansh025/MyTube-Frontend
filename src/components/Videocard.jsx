import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userIdowner } from "../utils/userDataFetch";
import { useSelector } from "react-redux";

function Videocard({ data }) {
  const [title, setTitle] = useState(data?.title || "Untitled");
  const [timeline, setTimeline] = useState("");
  const [videoOwner, setVideoOwner] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id); 

  // Handle window resize
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Format time difference between the current date and the video's creation date
  function timeDifference(date1, date2 = new Date()) {
    const difference = date2.getTime() - date1.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }

  // Fetch video owner details
  async function getOwner(userId) {
    try {
      const owner = await userIdowner(userId);
      setVideoOwner(owner);
    } catch (error) {
      console.error("Failed to fetch video owner:", error);
    }
  }

  // Handle "Manage Video" button click
  const handleManageVideoClick = (id) => {
    navigate(`/updatevideo/${id}`);
  };

  useEffect(() => {
    if (data?.owner) {
      getOwner(data.owner);
    }

    if (data?.createdAt) {
      const dateObject = new Date(data.createdAt);
      setTimeline(timeDifference(dateObject));
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [data]);

  return (
    <div className="w-full sm:w-[45%] relative border-2 border-gray-700 p-4 md:w-[40%] lg:w-[30%] xl:w-[23%] max-h-80">
      <Link to={`/videos/${data._id}`}>
        <div className="w-full overflow-hidden h-40 rounded-2xl">
          <img
            src={data?.thumbnail}
            alt={data?.title || "Video Thumbnail"}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex relative">
          <div className="p-1 pt-3">
            <div className="rounded-full w-6 h-6">
              <img
                className="rounded-full"
                src={videoOwner?.avatar || "https://via.placeholder.com/40"}
                alt={videoOwner?.owner || "Owner"}
              />
            </div>
          </div>

          <div>
            <div className="font-semibold leading-4 bg-transparent text-white p-1 pt-3 max-h-11 overflow-hidden">
              {windowWidth > 640
                ? title.length > 60
                  ? title.substring(0, 55) + " ..."
                  : title
                : title.length > 85
                ? title.substring(0, 85) + " ..."
                : title}
            </div>

            <div className="text-gray-500 text-sm font-bold pt-1">
              {videoOwner?.fullname || "Unknown Owner"}
            </div>
            <div className="flex text-gray-500 text-sm gap-3">
              <div>{data?.views || 0} views</div>
              <div>• {timeline}</div>
            </div>
          </div>
        </div>
      </Link>

      {/* Manage Video Button - Only Show for Video Owner */}
      {videoOwner && videoOwner._id === userId && (
  <button
    onClick={() => handleManageVideoClick(data._id)}
    className="bg-blue-500 text-white text-sm m-2 px-1 py-1 rounded-lg w-full"
  >
    Manage Video
  </button>
)}


    </div>
  );
}

export default Videocard;
