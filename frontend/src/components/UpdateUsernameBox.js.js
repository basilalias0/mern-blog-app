import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userUpdateAction } from '../Redux/AuthSlice';
import Cookies from 'js-cookie'
import { updateUsernameAPI } from '../Services/userServices';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function UpdateUsernameBox({show,setShow,setUpdate}) {

  const dispatch = useDispatch()

    const [isErrorActive,setIsErrorActive]=useState(true)
    

  const closeBtn = ()=>setShow(false)
  const closeErrorBtn=()=>{
    setIsErrorActive(false)
  }
  

  const navigate = useNavigate()

  const{mutateAsync,isError,error,isPending}= useMutation({
    mutationFn:updateUsernameAPI,
    mutationKey:['update-username']
  })

  const EditUsernameValidationSchema = Yup.object({
    username:Yup.string().required("To Update, Username Required")
  })

  const formik = useFormik({
    initialValues:{
      username:''
    },
    validationSchema:EditUsernameValidationSchema,
    onSubmit:(values,{resetForm})=>{
      mutateAsync(values)
      .then((data)=>
        {
          dispatch(userUpdateAction(data))
          Cookies.set("userData",JSON.stringify(data),{expires:1})
          setShow(false)
          resetForm()
          setUpdate(false)
          navigate(`/${data?.username}`)
        })
      .catch((e)=>console.log(e))
    }
  })


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
        <form onSubmit={formik.handleSubmit} className="flex  flex-col px-9 p rounded-md py-3  max-w-full bg-sky-300 w-[640px] max-md:px-5 max-md:mt-10">
      <h2 className="text-xl mb-1 font-bold max-md:max-w-full">Want to Update your Username?</h2>
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
          {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}

      <input
        id="usernameInput"
        name='username'
        type='text'
        {...formik.getFieldProps('username')}
        className=" justify-center pl-2 mt-2  h-10 rounded-md text-base bg-white max-md:max-w-full"
        placeholder="Type your new username here.."
        aria-label="Type your updated username here"
        onFocus={(()=>{
          setIsErrorActive(true)
        })}
      />
      {isErrorActive ? formik.touched.username && formik.errors.username && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.username}</span>):""}

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

export default UpdateUsernameBox;
