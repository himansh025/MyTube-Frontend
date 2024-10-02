import React from 'react'
import {  useNavigate } from 'react-router-dom'
function Button(
    {
        content = "button",
        width,
        height,
        bgcolor="violet",
        textColor="white",
        type,
        className="",
        props
        
    }
) {



  
  return (
    <div className='mx-auto'>
      <button type={type} className={`w-${width} ${className} p-2 px-4 bg-blue-900 font-semibold text-white rounded-lg`}>
          {content}
      </button>
    </div>
  )
}

export default Button