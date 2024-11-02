import React, { useState, useEffect } from "react";
import Video from "../components/Video";
import SideList from "../components/SideList";
import CommentList from "../components/CommentList";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
// import { getAVideo } from "../utils/videoDataFetch";
// import { getUserChannelProfile } from "../utils/userDataFetch";
import { addComment, getVideoComments } from "../utils/comment.data.fetch";
import Inputfield from "../components/Inputfield";
import { useForm } from "react-hook-form";

const VideoPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showComments, setshowComments] = useState(false);
  // const [video, setvideo] = useState({});
  const [owner, setOwner] = useState({});
  const [commentList, setcommentList] = useState([]);
  const [reload, setreload] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const { videoId } = useParams();

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    loadFunc();
   
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [videoId, reload]);


  async function comments(videoId) {
    const page = 1;
    const limits = 10;
    // console.log(" vid for comment ",videoId);
    
    const data = await getVideoComments(videoId, { page, limits });
    setcommentList(data?.data);
  }

  async function loadFunc() {
    
   await comments(videoId)
  }

  const submitComment = async (data) => {
    const commentData = await addComment(videoId, data);
    if (commentData) {
      setreload((prev) => prev + 1);
      reset();
    }
  };

  return (
    <div className="flex bg-gray-800  border-violet-100 rounded-sm flex-col lg:flex-row justify-center px-3  lg:p-0">
      <div className="w-full lg:w-10/12 p-3 lg:p-5">
        <Video  videoId={videoId} />
        <div className="w-full mx-3 my-5 text-white rounded-xl px-2 py-4 border-[1px] border-white ">
          <form
            onSubmit={handleSubmit(submitComment)}
            className="w-[99%] flex justify-center sm:px-5 sm:mt-10 items-center"
          >
            <Inputfield
              className="w-fit"
              placeholder="Add your comment.. "
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
