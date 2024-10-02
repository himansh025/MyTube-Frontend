import React, { useState, useRef, useEffect } from "react";
import { getAVideo, getUserChannelProfile } from "../utils/videoDataFetch";
import { MdThumbUp, MdThumbDown, MdShare } from "react-icons/md";
import { CgPlayButton, CgPlayPause } from "react-icons/cg";
import { toggleVideoLike, getLikesOfVideoById } from "../utils/likeDataFetch";

const Video = ({ videoSrc, thumbnail, title, videoId }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [video, setVideo] = useState(null); // Single video object
  const [owner, setOwner] = useState(null); // Owner object
  const [likes, setLikes] = useState(0); // Like count
  const [dislikes, setDislikes] = useState(0); // Dislike count
  const [isLiked, setIsLiked] = useState(false); // Like status
  const [isDisliked, setIsDisliked] = useState(false); // Dislike status

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle the Like action
  const handleLike = async () => {
    if (isLiked) return; // Prevent redundant API call if already liked
  
    const result = await toggleVideoLike(videoId, "like");
  
    if (result && result.success) {
      if (isDisliked) {
        setDislikes((prevDislikes) => (prevDislikes > 0 ? prevDislikes - 1 : 0)); // Remove dislike if it was previously disliked
      }
  
      setIsLiked(true);  // Mark the video as liked
      setIsDisliked(false); // Unmark as disliked
      setLikes((prevLikes) => prevLikes + 1); // Increment like count
    }
  };
  
  const handleDislike = async () => {
    if (isDisliked) return; // Prevent redundant API call if already disliked
  
    const result = await toggleVideoLike(videoId, "dislike");
  
    if (result && result.success) {
      if (isLiked) {
        setLikes((prevLikes) => (prevLikes > 0 ? prevLikes - 1 : 0)); // Remove like if it was previously liked
      }
  
      setIsDisliked(true);  // Mark the video as disliked
      setIsLiked(false); // Unmark as liked
      setDislikes((prevDislikes) => prevDislikes + 1); // Increment dislike count
    }
  };

  // Handle sharing the video
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Video link copied to clipboard!");
  };

  // Fetch video details and like/dislike counts
  async function fetchVideoDetails(videoId) {
    try {
      const videoData = await getAVideo(videoId);
      if (videoData?.data) {
        setVideo(videoData?.data.data); // Set video data
        fetchOwnerDetails(videoData?.data.data._id); // Fetch owner details using owner ID
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }

    // Fetch the like and dislike counts for the video
    try {
      const likeData = await getLikesOfVideoById(videoId);
      console.log("check1",likeData);
      
      if (likeData?.data) {
        setLikes(likeData.data.likeCount || 0); // Set initial like count
        setDislikes(likeData.data.dislikeCount || 0); // Set initial dislike count
        console.log(likeData.data.isLike);
        
        setIsLiked(likeData.data.isLiked); // Set initial liked state
        setIsDisliked(likeData.data.isDisliked); // Set initial disliked state
      }
    } catch (error) {
      console.error("Error fetching video likes and dislikes:", error);
    }
  }

  // Fetch owner details based on video owner ID
  async function fetchOwnerDetails(ownerId) {
    try {
      const ownerData = await getUserChannelProfile(ownerId);
      if (ownerData?.data) {
        setOwner(ownerData?.data); // Set owner data
      }
    } catch (error) {
      console.error("Error fetching owner details:", error);
    }
  }

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails(videoId);
    }
  }, [videoId,likes,dislikes]);

  return (
    <div className="video-player-container mx-auto p-4">
      {/* Video Container */}
      <div className="flex flex-col md:flex-col items-center lg:items-start gap-6">
        <div className="w-full sm:overflow-x-auto lg:w-5/5">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg max-h-96 lg:max-h-[600px]"
            poster={thumbnail || video?.thumbnail} // Use fetched thumbnail if not provided
            controls
            src={videoSrc || video?.videofile} // Use fetched video source if not provided
            style={{ objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Information and Controls */}
        <div className="w-full lg:w-1/4 text-left space-y-6">
          {/* Video Title */}
          <h3 className="text-xl lg:text-3xl font-bold text-white">
            {title || video?.title}
          </h3>

          {/* Uploaded By & Description */}
          {owner && (
            <div className="space-y-1">
              <p className="text-sm md:text-base text-white">
                Uploaded by: <span className="font-semibold">{owner.username || "Unknown"}</span>
              </p>
              <p className="text-sm md:text-base text-white">
                Description: <span>{video?.description || "No description"}</span>
              </p>
            </div>
          )}

          {/* Play/Pause Button */}
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <CgPlayPause className="h-4 w-4" />
            ) : (
              <CgPlayButton className="h-8 w-8" />
            )}
          </button>

          {/* Like, Dislike, Share Buttons */}
          <div className="flex space-x-4">
            <button
              className={`flex items-center space-x-2 px-3 py-2 rounded transition ${
                isLiked ? "bg-green-600" : "bg-green-500"
              } hover:bg-green-600`}
              onClick={handleLike}
            >
              <MdThumbUp />
              <span>{likes}</span>
            </button>
            <button
              className={`flex items-center space-x-2 px-3 py-2 rounded transition ${
                isDisliked ? "bg-red-600" : "bg-red-500"
              } hover:bg-red-600`}
              onClick={handleDislike}
            >
              <MdThumbDown />
              <span>{dislikes}</span>
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
