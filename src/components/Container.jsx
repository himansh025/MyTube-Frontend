import React, { useEffect, useState } from "react";
import Videocard from "./Videocard";
import { useSelector } from "react-redux";
import { getAllVideos } from "../utils/videoDataFetch.js";
import { getUserChannelProfile } from "../utils/userDataFetch.js";

function Container() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const user1 = useSelector((state) => state.auth.user);

  const pageData = async () => {
    setLoading(true); // Start loading
    let data = [];
    try {
      if (user1) {
        const user = await getUserChannelProfile(user1?.username);
        if (user) {
          const userdata = user.data?._id;
          data = await getAllVideos({ p: 1, l: 20, userdata, random: "true" });
        }
      } else {
        data = await getAllVideos({ p: 1, l: 20, random: "true" });
      }
      setVideoList(data?.data?.docs || []);
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    pageData();
  }, [user1]);

  return (
    <div className="w-full h-full flex flex-col items-center py-4 bg-slate-800 mx-auto">
      {loading ? (
        // Loader UI
        <div className="flex justify-center items-center w-full h-screen">
          <div className="loader">
           <h1 className="text-white text-2xl">
             Loading Videos
             </h1>
            </div>

        </div>
      ) : (
        // Videos UI
        <div className="w-full flex gap-7 border-2 rounded-md border-white flex-wrap">
          {Array.isArray(videoList) &&
            videoList.map((video, index) => (
              <Videocard key={index} data={video} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Container;
