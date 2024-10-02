import React, { useEffect, useState } from "react";

import { AiFillLike, AiTwotoneWallet } from "react-icons/ai";
import { getUserById } from "../utils/userDataFetch";
import { getLikesOfCommentById, toggleCommentLike } from "../utils/likeDataFetch";

const Comment = ({ data }) => {
  // console.log(data)
  const [username, setusername] = useState("");
  const [avatar, setavatar] = useState("");
  const [timeline, settimeline] = useState("");
  const [numberOfLikes, setnumberOfLikes] = useState([]);
  const [reload, setreload] = useState(0);

  console.log(data)

  async function loadFunc() {
    const username = await getUserById(data.owner);
    // console.log(username.data.username)
    setusername(username.data.username);
    setavatar(username.data.avatar);
    getLikes(data._id);
  }


  const getLikes = async(commentId)=>{
    const likes = await getLikesOfCommentById(commentId);
    setnumberOfLikes(likes.data);
  }

  const toggleLike = async () => {
    const like = await toggleCommentLike(data._id);
    if (like) {
      setreload((prev) => prev + 1);
    }
  };

  function timeDifference(date1, date2 = new Date()) {
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
  }

  useEffect(() => {
    loadFunc();
    const dateString = data?.createdAt;
    if (dateString) {
      const dateObject = new Date(dateString);
      const formattedDate = timeDifference(dateObject);
      // console.log(formattedDate);
      settimeline(formattedDate);
    }
  }, [reload]);

  return (
    <div className="w-full flex  bg-gray-900 p-2 text-white gap-3 m-4">
      <div className="overflow-hidden w-9 h-min mt-2 rounded-full">
        <img className="object-fit w-full" src={avatar} alt="" />
      </div>
      <div className="pt-1">
        <div className="flex items-center gap-3">
          <div className="font-semibold ">{username}</div>
          <div className="text-gray-400 text-sm">
            {timeline}
            {/* createdat */}
          </div>
        </div>
        <div className="p-3 text-sm">{data.content}</div>
        <div>
          <div className="flex  py-2 items-center text-white text-smm px-4 rounded-full  bg-gray-800 gap-2 w-min">
            <div onClick={toggleLike}>
              <AiFillLike />
            </div>
            <div className="font-semibold text-sm ">{numberOfLikes.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
