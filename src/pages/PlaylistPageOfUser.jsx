import React, { useEffect, useState } from 'react'
import PLaylistCard from '../components/PLaylistCard'
import { useParams } from 'react-router-dom'
import { getPlaylistById ,getUserPlaylists} from '../utils/playlistDataFetch';
import { getUserChannelProfile   } from '../utils/userDataFetch';

const PlaylistPageOfUser = (
) => {
  const {username} = useParams()
  const [Platlists, setPlatlists] = useState([]);
  const getPlaylists = async()=>{
    const channel = await getUserChannelProfile(username)
    if(channel){
      console.log(channel)
      const data = await getUserPlaylists(channel.data._id);
      console.log(data)
      if(data){
        setPlatlists(data.data);
      }
    }
  }

  useEffect(() => {
    getPlaylists()
  }, [])
  
  return (
    <div className='w-full'> 
    {
      Platlists.map((playlist)=>(
        <PLaylistCard playlist={playlist} owner={playlist.owner} />
      ))
    }
    </div>
  )
}

export default PlaylistPageOfUser