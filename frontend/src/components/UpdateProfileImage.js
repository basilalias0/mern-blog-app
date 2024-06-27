import {  useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { updateProfileImgAPI } from '../Services/userServices';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { userUpdateAction } from '../Redux/AuthSlice';


function UpdateProfileImage({show,setShow}) {
    
    const[image,setImage] =useState(null)
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        setImage(e.target.files[0])
        
    }
    const {mutateAsync,isPending,isError,error} = useMutation({
        mutationFn:updateProfileImgAPI,
        mutationKey:['update-profile-pic']
    })
    

    const closeBtn = ()=>setShow(false)
    

  const handleUploadPic = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('file',image)
    mutateAsync({formData}).then((data)=>{
        dispatch(userUpdateAction(data))
        queryClient.invalidateQueries('fetch-user-data')
        setShow(false)
    })
    }

  return (
    <div>
        <div
        className={`fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0 sm:py-8 ${
            show ? 'block' : 'hidden'
          } bg-gray-900 bg-opacity-50 transition-all ease-in-out duration-300`}
      > 
      
        <div
        className={`fixed inset-0 z-50 h-screen  w-screen flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0 sm:py-8  bg-gray-900 bg-opacity-50 transition-all  ease-in-out duration-300`}
      >
        
    <form onSubmit={handleUploadPic} enctype="multipart/form-data" className="flex  flex-col px-9 p rounded-md py-3  max-w-full bg-sky-300 w-[640px] max-md:px-5 max-md:mt-10" >
    <h2 className="text-xl mb-1 font-bold max-md:max-w-full">Want to Update your profile picture?</h2>
      <input 
      className='mx-1 py-2 mb-1 px-5 rounded-lg border border-white bg-sky-500' type="file" 
      name='profileImg'
      onChange={handleChange}
      />
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
      {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}
      <div className="justify-center self-end px-5 py-2 mt-3 text-center text-white whitespace-nowrap ">
      <button
      
        type="submit"
        className='mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500 hover:bg-sky-600'
      >
        Update
      </button>
      <button onClick={closeBtn} type="button" className="mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500 hover:bg-sky-600">
      Close
      </button>
      </div>
      </form>
    </div>
    </div>
    </div>
    
  );
}

export default UpdateProfileImage;
