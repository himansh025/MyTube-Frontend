import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useParams } from 'react-router-dom'
import { userIdowner } from '../utils/userDataFetch';
import { getVideoComments } from '../utils/comment.data.fetch';

const CommentList = ({ commentList, videoId }) => {
  const [list, setList] = useState([]);
  // const { username } = useParams();

  // Fetch video comments and owner details
  useEffect(() => {
    const getList = async () => {
      try {
        const data = await getVideoComments(videoId);
        const commentsWithOwners = await Promise.all(
          data.data.map(async (comment) => {
            const owner = await fetchOwnerName(comment.owner);
            return { ...comment, ownerName: owner || 'Unknown' };
          })
        );
        setList(commentsWithOwners);
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, [videoId]);


  console.log("list",list);
  

  // Fetch owner details
  const fetchOwnerName = async (ownerId) => {
    try {
      // console.log("ownerid",ownerId);
      
      const owner = await userIdowner(ownerId);
      console.log("owner ye hai kya",owner.fullname);
      return owner;
    } catch (error) {
      console.error("Failed to fetch owner name", error);
      return null;
    }
  };

  return (
    <div className='w-full flex flex-col border-2 border-gray-600 rounded-3xl gap-2 justify-center items-center overflow-hidden text-white'>
      {list.length === 0 ? (
        <div className='text-white p-2'>No comments</div>
      ) : (
        list.map((comment, index) => (
          <div key={index} className='w-full'>
            <Comment data={comment} ownerName={comment.ownerName} />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
