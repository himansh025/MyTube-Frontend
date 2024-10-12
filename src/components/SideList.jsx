import { useEffect, useState } from "react";
import { getAllVideos } from "../utils/videoDataFetch";
import VideoCardList from "./VideoCardList"

const SideList = (
  {
    className=""
  }
) => {
  
  const [videoList, setvideoList] = useState([]);
  
  const pageData = async()=>{
    const data = await getAllVideos({p:1 , l:10});
    // console.log(Array.isArray(data.data.docs));
    
    setvideoList(data.data.docs);
    return data.data.docs;
  }
  // console.log(videoList)

  useEffect(() => {
    pageData();
    // console.log(videoList)
  }, [])
  

  return (
    <div className={`w-full rounded-lg border-2 p-4 border-white ${className}`}>
      {videoList.map((video , index)=>(
        <div key={index}>
          <VideoCardList video={video} />
        </div>
      ))}
    </div>
  )
}

export default SideList