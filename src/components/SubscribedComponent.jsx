import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useSelector } from 'react-redux'
import { getSubscribedChannels } from '../utils/subscriptionDataFetch'

const SubscribedComponent = (
    {
        channel
    }
) => {

    const [channelsList, setChannelsList] = useState([])
    const userData = useSelector((state) => state.auth.user);
    
    
    const channelExtraction = async()=>{
        const res = await getSubscribedChannels(userData._id);
        if(res){
          setChannelsList(res.data);
        }
    }

    const subscribed = ()=>{
        const isInArray = channelsList.some(channel1 => 
            channel1._id === channel._id &&
            channel1.username === channel.username &&
            channel1.email === channel.email &&
            channel1.avatar === channel.avatar
        );

        return isInArray;
    }
  

    useEffect(() => {
        // console.log(user)
        // channelExtraction();
        console.log(channel)
        console.log(channelsList)
        console.log(channelsList.includes(channel))

    }, [])
    

  return (
    <div className='w-full flex gap-2 md:gap-10 px-1 sm:px-5'>
        <div className='rounded-full w-[60px] md:w-[80px] lg:w-[80px] overflow-hidden mx-2 md:mx-20'>
            <img className='object-contain rounded-full w-full' src={`
            ${channel && channel.avatar}
            `} 
            alt="" />
        </div>
        <div>
            <div className='text-md sm:text-2xl text-white font-bold'>
                
                {channel && channel.fullname}
            </div>
            <div className=' text-sm text-gray-300'>
                <span>@
                     {channel && channel.username}
                     </span> • <span> {" "}
                        {channel &&  channel.subscribers} 
                        subscribers</span>
            </div>
            <div className='hidden lg:block text-sm text-gray-300'>
                {channel && channel.description}
            </div>
        </div>
        <div>
            <Button content={`${subscribed ? "Subscribed": "Subscribe"}`} className={`rounded-xl ${subscribed? "bg-gray-500": "bg-green-700"}` }/>
        </div>
    </div>
  )
}

export default SubscribedComponent