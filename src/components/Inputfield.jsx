import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";



function Inputfield(
  { label, register, required, onChange , type,content="" , placeholder="" , name , width , className="" , ...props}
) {



  return (
    <div className=' w-full text-white flex flex-wrap'>
      {label && (
        <div className=''>
        <label className='p-2 flex items-center justify-center font-bold  sm:text-xl'>{label}</label>
      </div>
      )}
      <div className={`flex justify-center  ${label ? ("w-[90%]"):"w-full"}`}>
        <input {...props} onChange={onChange}  type={type} placeholder={placeholder} name={name} className={`w-[90%] sm:w-[90%]   p-2 bg-white text-black font-semibold rounded-lg ${className}`}  {...register(name, { required } ,{onChange: (e) => console.log(e.target.value)})} />
        
      </div>
    </div>
  )
}

export default Inputfield