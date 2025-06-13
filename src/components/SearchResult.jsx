import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { searchVideos } from '../utils/videoDataFetch'

const SearchResult = () => {
    const query = useSelector((state)=>state.search.query);
    const [list, setlist] = useState([]);
    const getData =async()=>{
        if(query){
            const data = await searchVideos({query});
            console.log(data)
            setlist(data.data)
        }
    }

    useEffect(() => {
        getData()
    }, [query])
    
  return (
    <div className='flex flex-col items-center gap-3 justify-center w-full'>
        {
            list.map((video)=>(
                <SeatchCard video={video} owner={video.owner} key={video._id} />
            ))
        }
    </div>
  )
}

export default SearchResult