import React from "react";
import { Link } from "react-router-dom";

const PLaylistCard = ({
    playlist,
    owner
}) => {

  return (
      <Link to={`/playlist/${playlist?._id || "0"}`} className="w-full">
        <div className="flex w-full sm:w-[90%]   p-4 border-b text-white border-gray-300 ">
          <div className="w-[40%] h-100px sm:h-[150px] lg:h-[200px] overflow-hidden mx-2 bg-red-600 relative">
            <img
              className="w-full h-full object-cover rounded-lg mr-4 "
              src={owner?.avatar || ""}
              alt={playlist?.name || ""}
            />
            <div className="w-full h-full bg-black opacity-65 text-xl font-bold flex justify-center items-center absolute top-0">
                    Play playlist
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-1">{playlist?.name || ""}</h2>
            <div className="flex items-center">
              <img
                className="w-6 h-6 rounded-full mr-2 object-cover"
                src={owner?.avatar || ""}
                alt={`${owner.fullName || ""}'s profile`}
              />
              <p className="text-gray-600">{owner?.fullName || ""}</p>
            </div>
            <div className="flex flex-col justify-center mt-1">
              <span className="w-4 h-4 fill-current text-gray-600 mr-1 flex justify-center items-center">
                •
              </span>
              <p className="text-gray-600 text-sm">{playlist?.views || ""} views</p>
              <p className="text-gray-600 text-sm">{playlist?.videos.length || ""} videos</p>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default PLaylistCard;
