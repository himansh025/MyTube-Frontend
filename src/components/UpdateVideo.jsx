import React, { useEffect, useState } from "react";
import { MdDoNotTouch, MdOutlineDriveFolderUpload } from "react-icons/md";
import Inputfield from "./Inputfield";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { getAVideo, updateThumbnail, updateVideo } from "../utils/videoDataFetch";


const UpdateVideo = ({ data }) => {
  const [video, setvideo] = useState({});
  const {videoId} = useParams();
  const { register, handleSubmit } = useForm();
  const submit = async (data) => {
    console.log(data)
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('thumbnail', data.thumbnail[0]); // Assuming data.thumbnail[0] is the file
  
      // Append other fields to FormData
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('isPublished', data.isPublished);
  
      // Make the axios request
      const response = await updateVideo(videoId , formData)
  
      // Handle the response
      console.log(response.data);
    } catch (error) {
      console.error('Error updating video data:', error);
    }
  };
  
  const updateThumb = ()=>{
    const t = document.getElementById("thumbnail")
    const file = t.files[0];
    console.log(file)

    try {
      const formData = new FormData();
      formData.append("thumbnail", file);
      console.log(formData)

      const thumbnailData = async ()=>{
        const data = await updateThumbnail( video._id ,formData);
        if(data){
          console.log(data)
        }
        console.log(data)
      }
      thumbnailData();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }
  

  const getVideoData = async(videoId)=>{
    const data  = await getAVideo(videoId);
    // console.log(data.data)
    setvideo(data.data);
  }

  useEffect(() => {
    getVideoData(videoId);
  }, [])
  

  return (
    <>
      <div className="text-white text-[30px] mx-auto font-bold">Edit video </div>
      <div className="text-white w-full h-full flex justify-center px-4">
        <div className="flex flex-col justify-center">
          <div className="text-xl font-bold mx-auto ">Thumbnail</div>
          <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[350px] mx-auto  h-[200px] overflow-hidden relative ">
            {/* thumbnail */}
            <img

              src={
                video.thumbnail
              }
              alt=""
              className="w-full object-cover"
            />
            <div className="w-full h-full bg-black opacity-50 text-white z-60 absolute top-0  flex flex-col justify-center items-center text-[120px] " onClick={()=>{
              document.getElementById("thumbnail").click()
            }}>
              <MdOutlineDriveFolderUpload />
              <div className="text-xl font-bold">Upload</div>
            </div>
          </div>


          <input type="file" accept="image/*" hidden id="thumbnail" name="thumbnail" {...register("thumbnail", { multiple: false })} onChange={updateThumb} />

          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2 pt-4" encType="multipart/form-data">
            <div>
              {/* title */}
              <Inputfield placeholder="Enter the title" className="w-[90%]" name={'title'} type={'text'} required={true} register={register} label={'Title'} defaultValue={video.title} />
            </div>
            <div className="flex justify-center flex-col">
              {/* description */}
              <div className="text-lg font-bold ">Description </div>
              <textarea name="" id="" defaultValue={video.description} className="rounded-lg p-2 text-black w-[90%] mx-auto" 
              style={{resize:'none'}} placeholder="Enter the description" rows="10" {...register("description" , {required:true})}>

              </textarea>
            </div>
            <div className="flex gap-3 mx-auto mt-3">{/* public */}
            <div className="  sm:text-lg  font-semibold text-white flex justify-center">
                    Select visibility :{" "}
                  </div>
                  <select
                    className="h-min text-black text-xl"
                    id="isPublished"
                    name="isPublished"
                    {...register("isPublished" , {required:true})}
                  >
                    <option value={false}>Private</option>
                    <option value={true}>Public</option>
                  </select>
            </div>
            <Button content="Update" className="mt-2" type={'submit'}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateVideo;
