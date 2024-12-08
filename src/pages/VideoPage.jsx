import React, { useState, useEffect } from "react";
import Video from "../components/Video";
import SideList from "../components/SideList";
import CommentList from "../components/CommentList";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { addComment, getVideoComments } from "../utils/comment.data.fetch";
import Inputfield from "../components/Inputfield";
import { useForm } from "react-hook-form";
import { toggleSubscription, getUserChannelSubscribers } from '../utils/subscriptionDataFetch.js' // Import subscription utilities

const VideoPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showComments, setshowComments] = useState(false);
  const [owner, setOwner] = useState({});
  const [commentList, setcommentList] = useState([]);
  const [reload, setreload] = useState(0);
  const [subscribed, setSubscribed] = useState(false); // Track subscription status
  const { register, handleSubmit, reset } = useForm();
  const { videoId } = useParams();

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    loadFunc();
    checkSubscriptionStatus(); // Check subscription status when videoId changes
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [videoId, reload]);

  // Fetch comments for the video
  async function comments(videoId) {
    const page = 1;
    const limits = 10;
    const data = await getVideoComments(videoId, { page, limits });
    setcommentList(data?.data);
  }

  // Load initial data
  async function loadFunc() {
    await comments(videoId);
  }

  // Check subscription status
  async function checkSubscriptionStatus() {
    try {
      const userId = "CURRENT_USER_ID"; // Replace with the current logged-in user's ID
      const subscribers = await getUserChannelSubscribers(videoId);
      const isSubscribed = subscribers.some((sub) => sub._id === userId);
      setSubscribed(isSubscribed);
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  }

  // Toggle subscription
  async function handleSubscribe() {
    try {
      await toggleSubscription(videoId);
      setSubscribed((prev) => !prev); // Toggle local state
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  }

  const submitComment = async (data) => {
    const commentData = await addComment(videoId, data);
    if (commentData) {
      setreload((prev) => prev + 1);
      reset();
    }
  };

  return (
    <div className="flex bg-gray-800 border-violet-100 rounded-sm flex-col lg:flex-row justify-center px-3 lg:p-0">
      <div className="w-full lg:w-10/12 p-3 lg:p-5">
        <Video videoId={videoId} />
        <div className="flex justify-between items-center my-5">
          {/* Subscribe Button */}
          <Button
            content={subscribed ? "Unsubscribe" : "Subscribe"}
            onClick={handleSubscribe}
            className={`${
              subscribed ? "bg-red-500" : "bg-blue-500"
            } text-white px-4 py-2 rounded-lg`}
          />
        </div>
        <div className="w-full mx-3 my-5 text-white rounded-xl px-2 py-4 border-[1px] border-white">
          <form
            onSubmit={handleSubmit(submitComment)}
            className="w-[99%] flex justify-center sm:px-5 sm:mt-5 items-center"
          >
            <Inputfield
              className="w-fit"
              placeholder="Add your comment.."
              required={true}
              name={"content"}
              register={register}
            />
            <div id="btn">
              <Button content="Add" type={"submit"} />
            </div>
          </form>
        </div>
        {windowWidth < 1024 && !showComments ? (
          <div className="flex justify-center items-center w-full border-2 border-white rounded-full py-4">
            <div
              onClick={() => {
                setshowComments((prev) => !prev);
              }}
            >
              <Button content="Show comments" />
            </div>
          </div>
        ) : (
          <div className="w-full">
            {windowWidth < 1024 && (
              <div className="flex justify-center items-center mb-3 w-full border-2 border-white rounded-full py-4">
                <div
                  onClick={() => {
                    setshowComments((prev) => !prev);
                  }}
                >
                  <Button content="Hide comments" />
                </div>
              </div>
            )}
            <CommentList videoId={videoId} commentList={commentList} />
          </div>
        )}
      </div>
      <div className="sm:w-[638px] mx-8 mt-5 lg:w-[600px]">
        <div className="text-2xl mb-2 white font-bold text-white">Recommendations</div>
        <SideList />
      </div>
    </div>
  );
};

export default VideoPage;
