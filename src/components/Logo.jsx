import React from 'react'

function Logo({width = "100px"}) {
  return (
    
    <div className='overflow-hidden'>
      <div className='w-[50px] object-fit'>
      <img src="logo.png" className='w-full object-fit' alt="" />
    </div>
    </div>
  )
}

export default Logo