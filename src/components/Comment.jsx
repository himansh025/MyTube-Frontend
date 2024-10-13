import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { getUserById } from "../utils/userDataFetch";
import { getLikesOfCommentById, toggleCommentLike } from "../utils/likeDataFetch";

const Comment = ({ data,ownerName }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [timeline, setTimeline] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState([]);
  const [reload, setReload] = useState(0);
  // const [ownerName, setOwnerName] = useState(""); // Add state for owner name
console.log("owner at comment",ownerName);

  // Load user info, likes, and other data
  async function loadFunc() {
    // const user = await getUserById(data.owner);
    setUsername(ownerName.fullname);
    setAvatar(ownerName.avatar);
    getLikes(ownerName._id);
  }

  // Fetch the owner's name and update state
  // const fetchOwnerName = async (id) => {
  //   console.log("id",id);
    
  //   const owner = await getUserById(id);
  //   console.log("owner check comment",owner);
    
  //       setOwnerName(owner?.data?.fullname); // Store resolved owner name in state
  // };

  // Get likes for the comment
  const getLikes = async (commentId) => {
    const likes = await getLikesOfCommentById(commentId);
    setNumberOfLikes(likes.data);
  };

  // Toggle like functionality
  const toggleLike = async () => {
    const like = await toggleCommentLike(data._id);
    if (like) {
      setReload((prev) => prev + 1);
    }
  };

  // Calculate time difference
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

  // Load data when component mounts or when reload state changes
  useEffect(() => {
    loadFunc();
    // fetchOwnerName(data.owner); // Fetch the owner's name on mount
    const dateString = data?.createdAt;
    if (dateString) {
      const dateObject = new Date(dateString);
      const formattedDate = timeDifference(dateObject);
      setTimeline(formattedDate);
    }
  }, [reload]);

  return (
    <div className="w-full flex bg-gray-900 p-2 text-white gap-3 m-4">
      <div className="overflow-hidden w-9 h-min mt-2 rounded-full">
        <img className="object-fit w-full" src={avatar} alt="" />
      </div>
      <div className="pt-1">
        <div className="flex items-center gap-3">
          <div className="font-semibold ">{username}</div> {/* Render owner name from state */}
          <div className="text-gray-400 text-sm">{timeline}</div>
        </div>
        <div className="p-3 text-sm">{data.content}</div>
        <div>
          <div className="flex py-2 items-center text-white text-smm px-4 rounded-full bg-gray-800 gap-2 w-min">
            <div onClick={toggleLike}>
              <AiFillLike />
            </div>
            <div className="font-semibold text-sm">{numberOfLikes.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
