import React, { useEffect } from "react";
// import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Videocard from "../components/Videocard";
import Bottombar from "../components/Bottomside";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CreatorProfile from "./CreatorProfile";
// import Dashboard from "./Dashboard";
// import CustomizeChannel from "./CustomizeChannel";
import { Outlet } from "react-router-dom";
// import UploadVideo from "../components/UploadVideo";
// import UploadTweet from "../components/UploadTweet";
// import Subscribed from "./Subscribed";


const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [videos, setVideos] = useState([
    // Sample video data, replace this with your actual video data or API call
    {
      _id: "1",
      title: "Sample Video 1",
      thumbnail: "https://stock.adobe.com/search?k=beautiful+pictures",
      owner: "owner1",
      views: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Sample Video 2",
      thumbnail: "https://www.gettyimages.com/photos/image" ,
      owner: "owner2",
      views: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: "Sample Video 1",
      thumbnail: "https://stock.adobe.com/search?k=beautiful+pictures",
      owner: "owner1",
      views: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: "Sample Video 2",
      thumbnail: "https://www.gettyimages.com/photos/image" ,
      owner: "owner2",
      views: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "4",
      title: "Sample Video 1",
      thumbnail: "https://stock.adobe.com/search?k=beautiful+pictures",
      owner: "owner1",
      views: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "5",
      title: "Sample Video 2",
      thumbnail: "https://www.gettyimages.com/photos/image" ,
      owner: "owner2",
      views: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "6",
      title: "Sample Video 1",
      thumbnail: "https://stock.adobe.com/search?k=beautiful+pictures",
      owner: "owner1",
      views: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "7",
      title: "Sample Video 2",
      thumbnail: "https://www.gettyimages.com/photos/image" ,
      owner: "owner2",
      views: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "8",
      title: "Sample Video 1",
      thumbnail: "https://stock.adobe.com/search?k=beautiful+pictures",
      owner: "owner1",
      views: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "9",
      title: "Sample Video 2",
      thumbnail: "https://www.gettyimages.com/photos/image" ,
      owner: "owner2",
      views: 2000,
      createdAt: new Date().toISOString(),
    },
    // Add more video objects as needed
  ]);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="lg:flex">
      {windowWidth < 1024 ? (
        <div className="fixed bg-zinc-900 z-50 p-2 bottom-0 w-full">
          <Bottombar />
        </div>
      ) : (
        <div className="sticky top-[80px] h-screen">
          <Sidebar />
        </div>
      )}

      <div className="w-full p-3 flex gap-9 flex-wrap justify-start pb-20">
     
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
