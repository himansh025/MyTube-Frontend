import React from 'react'
import { Link } from 'react-router-dom'

const SeatchCard = ({ video , owner }) => {
  return (
    
    <Link to={`/video/${video?._id}`} className='w-full'>
    <div className="flex w-full sm:w-[90%]   p-4 border-b text-white border-gray-300 ">
      <div className='w-[40%] h-100px lg:h-[200px] overflow-hidden mx-2'>
      <img
        className="w-full h-full object-cover rounded-lg mr-4 "
        src={video?.thumbnail}
        alt={video?.title}
      />
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-lg mb-1">{video?.title}</h2>
        <div className="flex items-center">
          <img
            className="w-6 h-6 rounded-full mr-2 object-cover"
            src={owner?.avatar}
            alt={`${owner.fullName}'s profile`}
          />
          <p className="text-gray-600">{owner?.fullName}</p>
        </div>
        <div className="flex items-center mt-1">
          <span
            className="w-4 h-4 fill-current text-gray-600 mr-1 flex justify-center items-center"
            
          >•
          </span>
          <p className="text-gray-600 text-sm">{video?.views} views</p>
        </div>
      </div>
    </div>
    </Link>
    )
}

export default SeatchCard