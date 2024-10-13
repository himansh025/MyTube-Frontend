import React, { useEffect, useState } from "react";
import Videocard from "./Videocard";
import { useSelector } from "react-redux";
import { getAllVideos } from '../utils/videoDataFetch.js';
import { getUserChannelProfile } from "../utils/userDataFetch.js";

function Container() {
  const [videoList, setVideoList] = useState([]);
  // const status = useSelector((state) => state.auth.status);
  const user1 = useSelector((state) => state.auth.user);

// const pagedata= async()=>{
//   try {
//         const data = await getAllVideos({ p: 1, l: 10 });
//           setVideoList(data?.data?.docs || []);
//         } catch (error) {
//           console.error("Error fetching all videos", error);
//         }
// }
// console.log("videolist ye hai",videoList);


  const pageData = async () => {
    let data = [];
    // console.log("user sgya",user1);
    
    if (user1) {
      try {
        const user = await getUserChannelProfile(user1?.username);
      //  console.log("userss",user);
       
        if (user?.data) {
          data = await getAllVideos({ p: 1, l: 10,user:user.data._id});
          console.log(" is data",data);
          
          setVideoList(data?.data.docs || []);
        }
      } catch (error) {
        console.error("Error fetching user videos", error);
      }
    } else {
      try {
        data = await getAllVideos({ p: 1, l: 10 });
        setVideoList(data?.data?.docs || []);
      } catch (error) {
        console.error("Error fetching all videos", error);
      }
    }
  };

  useEffect(() => {
    pageData();
    // pagedata();
  }, [user1]);

  return (
    <div className="w-full  h-full flex gap-7 border-2 rounded-md border-white py-4 bg-slate-800 flex-wrap mx-auto">
      {Array.isArray(videoList) &&
        videoList.map((video, index) => <Videocard key={index} data={video} />)}
    </div>
  );
}

export default Container;
