import React, { useState } from "react";
import Inputfield from "./Inputfield";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { createTweet } from "../utils/tweetDataFetch";

const UploadTweet = ({
  
}) => {
  const { register, handleSubmit } = useForm();
  const [tweetContent, settweetContent] = useState("");
  const [posted, setposted] = useState(false);
  const [clicked, setclicked] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    setclicked(true);
    const tweetdata = await createTweet(data);
    console.log(tweetdata);
    setposted(true);
    document.getElementById("tweetContent").value = "";
  };
  return (
    
    <div className="mx-auto w-min relative flex flex-col  items-center">
      {posted && (
              <div className="bg-green-500 text-white px-6 py-4 border-0 rounded relative mb-4">
                <span className="text-xl inline-block mr-5 align-middle">
                  <i className="fas fa-check-circle"></i>
                </span>
                <span className="inline-block align-middle mr-8">
                  <b className="capitalize">Success!</b> Your tweet has been
                  posted successfully.
                </span>
                <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                  <span onClick={()=>setposted(false)}>×</span>
                </button>
              </div>
            )}
      <div className="w-[300px] sm:w-[500px] border-[1px] border-white rounded-2xl p-5">
        <div className="text-white text-3xl font-semibold flex justify-center">
          Write your Tweet
        </div>
        <div className="w-full flex flex-col justify-center  pt-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
          >
            <textarea
              rows="4" // Set the number of visible rows
              cols="50" // Set the number of visible columns
              placeholder="Enter your text here..."
              name="content"
              id="tweetContent"
              className="rounded-2xl p-3"
              {...register("content", { required: true })}
            />
            

            <Button type={"submit"} content="Post" className="mt-3" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadTweet;
