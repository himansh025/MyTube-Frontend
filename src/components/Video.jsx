import React, { useState, useRef, useEffect } from "react";
import { getAVideo } from "../utils/videoDataFetch";
import { getUserChannedetails } from "../utils/userDataFetch";
import { MdThumbUp, MdShare } from "react-icons/md";
import { CgPlayButton, CgPlayPause } from "react-icons/cg";
import { toggleVideoLike, getLikesOfVideoById } from "../utils/likeDataFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add navigation to user channel
import { incrementView } from "../utils/videoDataFetch";

const Video = ({ videoSrc, thumbnail, title, videoId }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [video, setVideo] = useState(null); // Single video object
  const [owner, setOwner] = useState(null); // Owner object
  const [likes, setLikes] = useState(0); // Like count
  const [reload, setreload] = useState('');
  const [views, setviews] = useState(0);
  const [viewIncremented, setViewIncremented] = useState(false); // Track if view is incremented
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const check = async (username) => {
    const getchannelowner = await getUserChannedetails(username);
    if (getchannelowner.data?.username === username) {
      setOwner(getchannelowner.data);
    } else {
      console.log("Channel owner not found.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Video link copied to clipboard!");
  };

  const toggleLike = async () => {
    const likeAdded = await toggleVideoLike(videoId);
    if (likeAdded) {
      console.log("Like toggled successfully");
      setreload((prev) => prev + 1);
    }
  };

  const getlike = async (videoId) => {
    const like = await getLikesOfVideoById(videoId);
    setLikes(like.data.length);
  };

  async function fetchVideoDetails(videoId) {
    try {
      const videoData = await getAVideo(videoId);
      if (videoData?.data) {
        setVideo(videoData?.data.data);
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  }

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const incView = async () => {
    try {
      const viewData = await incrementView(videoId);
      console.log("check views at video page", viewData);
      setviews(viewData.data.views);
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails(videoId);
      getlike(videoId);
      check(user?.username);

      // Only call incView once when the component mounts
      if (!viewIncremented) {
        incView();
        setViewIncremented(true); // Mark view as incremented
      }
    }
  }, [videoId, reload]);

  return (
    <div className="video-player-container mx-auto p-4">
      <div className="flex flex-col items-center lg:items-start gap-6">
        <div className="w-full sm:overflow-x-auto lg:w-5/5">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg border-2 border-white max-h-96 lg:max-h-[600px]"
            poster={thumbnail || video?.thumbnail}
            controls
            autoPlays
            src={videoSrc || video?.videofile}
            style={{ objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="w-full lg:w-5/5 text-left p-4 border-2 rounded-md border-white space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            {title || video?.title}
          </h3>
          <h3 className="text-md lg:text-xl font-bold text-white">
            total views: {views}
          </h3>

          {owner && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/channel/${owner?.username}`)}
                  className="md:text-lg border-2 border-red-400 rounded-md bg-teal-950 w-28 font-bold text-blue-500 hover:underline"
                >
                  {owner?.username
                    ? capitalizeWords(owner.username)
                    : "No description available"}
                </button>

                <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Subscribe
                </button>
              </div>

              <p className="text-sm text-gray-400">
                <span>
                  {owner?.fullname
                    ? capitalizeWords(owner.fullname)
                    : "No description available"}
                </span>
              </p>
              <p className="text-sm text-white">
                Description : {video?.description || "No description"}
              </p>
            </div>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <CgPlayPause className="h-5 w-5 mr-2" />
            ) : (
              <CgPlayButton className="h-5 w-5 mr-2" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <div className="flex space-x-4 mt-2">
            <button
              className={`flex items-center space-x-2 px-3 py-2 rounded transition ${
                likes ? "bg-green-600" : "bg-green-500"
              } hover:bg-green-600`}
              onClick={toggleLike}
            >
              <MdThumbUp />
              <span>{likes}</span>
            </button>

            <button
              className="flex items-center space-x-2 bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600 transition"
              onClick={handleShare}
            >
              <MdShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
