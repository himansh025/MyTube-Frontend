import React from 'react';
import Button from './Button';

const SubscribedComponent = ({ channel }) => {
  // Handle nested channel data structure (for subscribers or subscribed channels)
  const channelData = channel?.subscriber || channel; // `subscriber` for subscribers list, otherwise use `channel`

  return (
    <div className="w-full flex items-center gap-4 md:gap-6 px-3 py-2 bg-gray-900 rounded-lg sm:px-5">
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

      {/* Subscribe/Unsubscribe Button */}
      <Button
        content="View Profile" // Replace with specific functionality if needed
        className="rounded-xl bg-blue-600"
        onClick={() => alert(`Viewing profile of ${channelData?.username || 'User'}`)}
      />
    </div>
  );
};

export default SubscribedComponent;
