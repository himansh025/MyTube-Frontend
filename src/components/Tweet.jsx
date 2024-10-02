import React, { useEffect, useState } from "react";

import { AiFillLike, AiTwotoneWallet } from "react-icons/ai";
import { getUserById, getUserChannelProfile } from "../utils/userDataFetch";
import {
  getLikesOfCommentById,
  getLikesOfTweetById,
  toggleCommentLike,
  toggleTweetLike,
} from "../utils/likeDataFetch";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Tweet = ({ data }) => {
  // console.log(data)
  const [timeline, settimeline] = useState("");
  const [numberOfLikes, setnumberOfLikes] = useState([]);
  const [reload, setreload] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const getLikes = async (tweetId) => {
    const likes = await getLikesOfTweetById(tweetId);
    setnumberOfLikes(likes.data);
  };

  const toggleLike = async () => {
    const like = await toggleTweetLike(data._id);
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
    // loadFunc();
    console.log(data._id);
    getLikes(data._id);
    const dateString = data?.createdAt;
    if (dateString) {
      const dateObject = new Date(dateString);
      const formattedDate = timeDifference(dateObject);
      // console.log(formattedDate);
      settimeline(formattedDate);
    }
  }, [reload]);

  return (
    <div className="w-full flex  bg-gray-900 p-2 text-white gap-3 m-4 relative">
      <div className="overflow-hidden w-9 h-min mt-2 rounded-full">
        <img className="object-fit w-full" src={data.owner.avatar} alt="" />
      </div>
      <div className="pt-1">
        <div className="flex items-center gap-3">
          <div className="font-semibold ">{data.owner.username}</div>
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
      {data.owner._id === user._id ? (
        <div
          className="bg-gray-400 px-2 py-1 font-semibold rounded-md text-black absolute right-6 top-5 "
          onClick={() => {
            navigate(`/home/tweets/${data._id}`);
          }}
        >
          Edit
        </div>
      ) : null}
    </div>
  );
};

export default Tweet;
