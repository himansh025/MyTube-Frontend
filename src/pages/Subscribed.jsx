import React, { useState } from 'react'
import SubscribedComponent from '../components/SubscribedComponent'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSubscribedChannels } from '../utils/subscriptionDataFetch';

const Subscribed = () => {
  const [channelsList, setChannelsList] = useState([])
  const userData = useSelector((state) => state.auth.user);
  // console.log(userData)
  
  const channel = async()=>{
      const res = await getSubscribedChannels(userData._id);
      if(res){
        setChannelsList(res.data);
      }
      console.log("hello im loading")
      // console.log(res)
  }

  useEffect(() => {
    channel();
  }, [])
  
  return (
    <div className='flex flex-col gap-6 w-full items-center'>
      {channelsList.length === 0 && (
        <div className='w-full h-full flex justify-center items-center font-bold text-3xl text-white'>
          No subscribed channels
        </div>
      )}
      
      {channelsList.map((channel)=>(
        <div key={channel._id} className='w-min'>
          <SubscribedComponent channel={channel}/>
        </div>
      ))}
    </div>
  )
}

export default Subscribed