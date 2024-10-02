import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { useParams } from 'react-router-dom'
import { getUserTweets } from '../utils/tweetDataFetch';
import Tweet from './Tweet';
import { getVideoComments } from '../utils/comment.data.fetch';

const CommentList = ({commentList , videoId}) => {
  // useState
  // console.log(commentList)
  const [list, setlist] = useState([]);

  const {username} = useParams();
  useEffect(() => {
    const getList = async ()=>{
      try {
        const data = await getVideoComments(videoId);
        console.log(data);
        setlist(data.data);
        console.log(list)
      } catch (error) {
        console.log(error)
      }
    }
    getList();
  }, [])
  

  if(commentList){
    return (
      <div className='w-full flex flex-col border-2 border-gray-600 rounded-3xl gap-2 justify-center items-center overflow-hidden text-white'>
          
          {
            commentList.length === 0 ? (
              <div className='text-white p-2'>No comments</div>
            ) : ""
          }
          {commentList.map((comment , index)=>(
            <div key={index} className='w-full' >
              <Comment
               data={comment}
                />
            </div>
          ))}
      </div>
    )
  }else{
    return(
      <div className='w-full flex flex-col border-2 border-gray-600 rounded-3xl gap-2 text-white'>
          <div className='font-bold  text-2xl px-4 py-3'>
              {/* {content}  */}
          </div>
          {list.map((tweet , index)=>(
              <Tweet
               data={tweet}
               key={index}
                />
          ))}
      </div>
    )
  }

  
}

export default CommentList