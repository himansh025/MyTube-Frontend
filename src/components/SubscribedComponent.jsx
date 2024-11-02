import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { getSubscribedChannels } from '../utils/subscriptionDataFetch';

const SubscribedComponent = ({ channel }) => {
    const [channelsList, setChannelsList] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);  // Tracks subscription status
    const userData = useSelector((state) => state.auth.user);

    // Fetch subscribed channels when userData changes
    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            if (userData?._id) {
                try {
                    const res = await getSubscribedChannels(userData._id);
                    if (res?.data) {
                        setChannelsList(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching subscribed channels:", error);
                }
            }
        };

        fetchSubscribedChannels();
    }, [userData]);

    // Check if the current channel is in the list of subscribed channels
    useEffect(() => {
        if (channel && channelsList.length) {
            const isChannelSubscribed = channelsList.some(
                (subscribedChannel) => subscribedChannel._id === channel._id
            );
            setIsSubscribed(isChannelSubscribed);
        }
    }, [channel, channelsList]);

    // Handle nested channel data structure
    const channelData = channel?.subscriber || channel;  // Use nested data if it exists

    return (
        <div className="w-full flex items-center gap-4 md:gap-6 px-3 py-2 bg-gray-900  sm:px-5">
            {/* Image Container */}
            <div className="flex-shrink-0 w-[60px] md:w-[80px] rounded-full overflow-hidden">
                <img
                    className="object-cover rounded-full w-full h-full"
                    src={channelData?.avatar || '/path/to/default-avatar.png'}
                    alt={channelData?.username || 'Channel Avatar'}
                />
            </div>

            {/* Channel Info */}
            <div className="flex-1">
                <div className="text-md sm:text-2xl text-white font-bold leading-tight">
                    {channelData?.fullname || 'Channel Name'}
                </div>
                <div className="text-sm text-gray-300 flex items-center gap-1">
                    <span>@{channelData?.username || 'username'}</span> •
                    <span>{channelData?.subscribers || 0} subscribers</span>
                </div>
                <div className="hidden lg:block text-sm text-gray-300">
                    {channelData?.description || 'No description available.'}
                </div>
            </div>

            {/* Subscribe Button */}
            <Button
                content={isSubscribed ? 'Subscribed' : 'Subscribe'}
                className={`rounded-xl ${isSubscribed ? 'bg-gray-500' : 'bg-green-700'}`}
            />
        </div>
    );
};

export default SubscribedComponent;
