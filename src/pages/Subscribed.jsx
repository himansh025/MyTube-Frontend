import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SubscribedComponent from '../components/SubscribedComponent';
import { getSubscribedChannels, getUserChannelSubscribers } from '../utils/subscriptionDataFetch';

const Subscribed = () => {
  const [channelsList, setChannelsList] = useState([]); // Channels user subscribed to
  const [subscribersList, setSubscribersList] = useState([]); // Users subscribed to the channel
  const userData = useSelector((state) => state.auth.user);

  // Fetch channels the user subscribed to
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

  // Fetch subscribers for the user's channel
  const fetchSubscribers = async () => {
    if (userData?._id) {
      try {
        const res = await getUserChannelSubscribers(userData._id);
        if (res?.data) {
          setSubscribersList(res.data);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    }
  };

  useEffect(() => {
    fetchSubscribedChannels();
    fetchSubscribers();
  }, [userData]);

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      {/* Subscribed Channels */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Subscribed Channels</h2>
        {channelsList.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center font-bold text-xl text-gray-800">
            No subscribed channels
          </div>
        ) : (
          channelsList.map((channel) => (
            <SubscribedComponent key={channel._id} channel={channel.channel} />
          ))
        )}
      </div>

      {/* Subscribers */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Subscribers</h2>
        {subscribersList.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center font-bold text-xl text-gray-800">
            No subscribers yet
          </div>
        ) : (
          subscribersList.map((subscriber) => (
            <SubscribedComponent key={subscriber._id} channel={subscriber.subscriber} />
          ))
        )}
      </div>
    </div>
  );
};

export default Subscribed;
