import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistById } from '../utils/playlistDataFetch';
import SeatchCard from './SeatchCard';

const Playlist = () => {
  const {playlistId} = useParams();
  const [playlist1, setplaylist] = useState({});
  const [videos, setvideos] = useState([])
  const getPlaylist =async()=>{
    const data = await getPlaylistById(playlistId);
    console.log(data)
    setplaylist(data.data);
    setvideos(data.data.videos)
  }


  useEffect(() => {
    getPlaylist();
  }, [])
  
  return (
    <div className='w-full flex flex-col'>
        <div className='w-full bg-gray-900 text-white p-2 rounded-xl'>
          <div className='font-bold text-2xl px-3 py-5'> {playlist1.name}</div>
          <div className=' p-3'> {playlist1.description}</div>
          {/* playlist info */}
          <div className='px-8 w-full flex justify-end'>created by : <span className='font-semibold'> { playlist1.owner.fullName}</span> </div>
        </div>
        <div>
          {/* list of videos  */}
          {videos.map((video)=>(
            <SeatchCard video={video} owner={video.owner} />
          ))}
        </div>
    </div>
  )
}

export default Playlist