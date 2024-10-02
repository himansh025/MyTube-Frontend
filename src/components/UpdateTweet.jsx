import React, { useEffect, useState } from "react";
import Inputfield from "./Inputfield";
import { useForm } from "react-hook-form";
import Button from "./Button";
import {
  createTweet,
  deleteTweet,
  getTweetById,
  updateTweet,
} from "../utils/tweetDataFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import showToast from "./ShowToast";

const DeleteConfirmationDialog = ({ onDelete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <p className="text-lg font-semibold mb-2">
          Are you sure you want to delete the tweet?
        </p>
        <div className="flex justify-end">
          <button
            className="text-blue-500 px-4 py-2"
            onClick={() => onDelete(false)}
          >
            Cancel
          </button>
          <button
            className="text-red-500 px-4 py-2 ml-2"
            onClick={() => onDelete(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateTweet = ({}) => {
  const { tweetId } = useParams();
  const { register, handleSubmit } = useForm();
  const [tweetContent, settweetContent] = useState("");
  const [posted, setposted] = useState(false);
  const [clicked, setclicked] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const onSubmit = async (data) => {
    console.log(data);
    const response = await updateTweet(tweetId, data);
    console.log(response);
    if (response) {
      navigate(`/home/creatorProfile/${user.username}/tweets`);
    }
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleDeleteConfirmation = async(confirmed) => {
    if (confirmed) {
      // Perform the delete action
      // Call the API or dispatch a delete action, etc.
      const deletedTweet = await deleteTweet(tweetId);
      console.log(deletedTweet);
      if(deletedTweet){
        showToast("Deleted" , "Tweet")
        navigate('/')
      }
      console.log("Deleting the tweet...");
    }

    // Close the dialog
    setShowDialog(false);
  };

  useEffect(() => {
    // console.log(data)
    const getTweet = async () => {
      const data = await getTweetById(tweetId);
      console.log(data.data);
      settweetContent(data.data.content);
    };
    getTweet();
  }, []);

  return (
    <div className="mx-auto w-min relative flex flex-col  items-center">
      {posted && (
        <div className="bg-green-500 text-white px-6 py-4 border-0 rounded relative mb-4">
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-check-circle"></i>
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Success!</b> Your tweet has been updated
            successfully.
          </span>
          <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
            <span onClick={() => setposted(false)}>×</span>
          </button>
        </div>
      )}
      <div className="w-[300px] sm:w-[500px] border-[1px] border-white rounded-2xl p-5">
        <div className="text-white text-3xl font-semibold flex justify-center">
          Update your Tweet
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
              defaultValue={tweetContent}
              style={{ resize: "none" }}
              {...register("content", { required: true })}
            />

            <Button type={"submit"} content="Update" className="mt-3" />
          </form>
        </div>
      </div>

      <div
        className="text-red-900  text-3xl p-2 border-[1px] mt-3 border-red-700 rounded-full"
        onClick={handleDeleteClick}
      >
        <MdDelete />
      </div>

      {showDialog && (
        <DeleteConfirmationDialog onDelete={handleDeleteConfirmation} />
      )}
    </div>
  );
};

export default UpdateTweet;
