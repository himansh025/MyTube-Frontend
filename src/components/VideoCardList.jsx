import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../utils/userDataFetch";

const VideoCardList = ({ video }) => {

  const [first, setfirst] = useState(
    video ? video.title : ""
  );
  const [timeline, settimeline] = useState('')
  const [owner, setowner] = useState("");
  const navigate = useNavigate()

  // console.log(video)

  function timeDifference(date1, date2 = new Date()) {
    const difference = date2.getTime() - date1.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    
    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  async function getOwner(userId) {
    const owner = await getUserById(userId);

    // console.log(owner.data);set
    setowner(owner.data);
    return owner.data;
  }


  useEffect(() => {
    getOwner(video.owner);
    const dateString = video.createdAt;
    if(dateString){
      const dateObject = new Date(dateString);
      const formattedDate = timeDifference(dateObject);
      // console.log(formattedDate);
      settimeline(formattedDate)
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []); // Empty dependency array for mount and unmount only

  const shortenTitle = (video, maxLength = 15) => {
    if (video.length > maxLength) {
    
    
      return video.substring(0, maxLength) + '...';
    }
    return video;
  };

  const videotitle=()=>{
    shortenTitle(video);
  }

  return (
    <Link to={`/video/${video?._id}`}>
    <div className="w-full my-3 flex gap-10 py-3 items-center justify-center">
      <div className="w-[150px] h-[85px] overflow-hidden">
        <img
          className="w-full h-full object-fit"
          src={video.thumbnail}
          alt=""
        />
      </div>
      <div>
        <div className=" font-semibold leading-4  text-white pt-3 max-h-11 overflow-hidden">
          {/* title */}
          {videotitle}
          {windowWidth > 640
            ? first.length > 60
              ? first.substring(0, 55) + " ..."
              : first
            : null}
          {windowWidth < 400
            ? first.length > 85
              ? first.substring(0, 85) + " ..."
              : first
            : null}
          {windowWidth > 400 && windowWidth < 640
            ? first.length > 120
              ? first.substring(0, 140) + " ..."
              : first
            : null}
        </div>
        <div>
          <div className="text-gray-500 text-sm font-bold pt-1">
            {/* owner */}
            {owner.fullName}
          </div>
          <div className="flex text-gray-500 text-sm gap-3">
            <div>
              {/* view */}
              {video.views} views
            </div>
            <div>{/* upload time */}• {timeline}</div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default VideoCardList;
