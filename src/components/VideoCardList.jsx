import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../utils/userDataFetch";

const VideoCardList = ({ video }) => {
  const [first, setFirst] = useState(video ? video.title : "");
  const [timeline, setTimeline] = useState("");
  const [owner, setOwner] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const timeDifference = (date1, date2 = new Date()) => {
    const difference = date2.getTime() - date1.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const getOwner = async (userId) => {
    const owner = await getUserById(userId);
    console.log("is owner",owner);
    
    setOwner(owner.data);
  };

  const shortenTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  useEffect(() => {
    getOwner(video.owner);

    const dateString = video.createdAt;
    if (dateString) {
      const dateObject = new Date(dateString);
      const formattedDate = timeDifference(dateObject);
      setTimeline(formattedDate);
    }

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [video]);

  const getMaxTitleLength = () => {
    if (windowWidth < 400) return 50;
    if (windowWidth < 640) return 70;
    return 90;
  };

  return (
    <Link to={`/video/${video._id}`} className="w-full my-3 flex gap-4 py-3 items-center">
      <div className="w-[150px] h-[85px] overflow-hidden rounded-md">
        <img className="w-full h-full object-cover" src={video.thumbnail} alt={video.title} />
      </div>
      <div className="flex-grow">
        <div className="text-white font-semibold text-md lg:text-lg leading-4 max-h-11 overflow-hidden">
          {shortenTitle(first, getMaxTitleLength())}
        </div>
        <div className="text-gray-500 text-sm font-bold">
          {video? video.fullName : "Loading..."}
        </div>
        <div className="flex text-gray-500 text-sm gap-3">
          <span>{video.views} views</span>
          <span>• {timeline}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCardList;
