import React, { useEffect, useState } from "react";
import Videocard from "./Videocard";
import { useSelector } from "react-redux";
import { getAllVideos } from "../utils/videoDataFetch.js";

function MyVideos() {
  const [videoList, setVideoList] = useState([]);
  const userId = useSelector((state) => state.auth.user?._id); // Assuming the user's ID is stored in Redux

  const fetchMyVideos = async () => {
    try {
      // Fetch videos with the userId as a parameter
      const data = await getAllVideos({ userId });
      setVideoList(data?.data?.docs || []);
    } catch (error) {
      console.error("Error fetching user's videos:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyVideos();
    }
  }, [userId]);

  return (
    <div className="w-full h-full flex gap-7 border-2 rounded-md border-white py-4 bg-slate-800 flex-wrap mx-auto">
      {Array.isArray(videoList) &&
        videoList.map((video, index) => <Videocard key={index} data={video} />)}
    </div>
  );
}

export default MyVideos;
