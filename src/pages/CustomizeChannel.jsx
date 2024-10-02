import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import Inputfield from '../components/Inputfield';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { updateAccountDetails } from '../utils/userDataFetch';
import { useNavigate } from 'react-router-dom';

const CustomizeChannel = () => {
    const { register, handleSubmit } = useForm();
    const user = useSelector((state)=>state.auth.user)
    const [reload, setreload] = useState(0);
    const navigate = useNavigate();
    

    const updateDetails = (data)=>{
      if(data.fullName === ''){
        data.fullName = user.fullName;
      }
      if(data.email === ''){
        data.email = user.email;
      }
      const dataInfo = async ()=>{
        const accountInfo = await updateAccountDetails(data);
        if(accountInfo){
          navigate(`/home/creatorProfile/${user.username}`)
        }
      }
      dataInfo();
    }
    useEffect(() => {
      
    }, [reload])
    

  return (
    <div className='flex flex-col items-center w-full'>
        <div className='font-bold text-3xl text-white underline mb-3 '>Edit profile</div>
        <form onSubmit={handleSubmit(updateDetails)} className='flex flex-col items-center gap-4 w-[90%] md:w-[50%]'>
            <Inputfield placeholder='Enter your full name ' className='' type="text" name="fullName"  register={register}  required/>
            <Inputfield placeholder='Enter your email ' type="text" name="email"  register={register}  required/>
            <Button type="submit" content='Submit'/>
        </form>
    </div>
  )
}

export default CustomizeChannel