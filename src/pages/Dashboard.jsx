import React, { useEffect, useState } from 'react';
import { getChannelStats } from '../utils/dashboardDataFetch';
import { FaThumbsUp, FaComments, FaVideo, FaUsers, FaEye } from 'react-icons/fa';

const Dashboard = () => {
  const [data, setdata] = useState('');

  async function getDashBoardData() {
    const data = await getChannelStats();
    // console.log("data", data);
    setdata(data?.data);
  }

  useEffect(() => {
    getDashBoardData();
  }, []);

  const obj = [
    {
      content: "Total numbers of likes",
      value: data.numberOfLikes,
      icon: <FaThumbsUp className='text-blue-500 text-2xl' />,
    },
    {
      content: "Total numbers of comments",
      value: data.numberOfComments,
      icon: <FaComments className='text-green-500 text-2xl' />,
    },
    {
      content: "Total Numbers of Videos",
      value: data.numberOfVideos,
      icon: <FaVideo className='text-purple-500 text-2xl' />,
    },
    {
      content: "Total number of subscribers",
      value: data.subscribers,
      icon: <FaUsers className='text-red-500 text-2xl' />,
    },
    {
      content: "Total number of views",
      value: data.views,
      icon: <FaEye className='text-yellow-500 text-2xl' />,
    },
  ];

  return (
    <div className='flex items-center w-full flex-col'>
      <div className='text-4xl text-gray-800 font-bold mb-8 w-full text-center'>
        Dashboard
      </div>
      <div className='flex w-full gap-6 flex-wrap flex-col text-gray-800 justify-center items-center px-3 py-6'>
        {
          obj.map((task) => (
            <div
              key={task.content}
              className='w-full lg:w-1/2 xl:w-1/3 bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex items-center justify-between gap-5 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='flex items-center justify-center gap-3'>
                {task.icon}
                <div className='text-lg font-semibold'>{task.content}</div>
              </div>
              <div className='text-xl font-bold text-gray-600'>
                {task.value ?? 'N/A'}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
