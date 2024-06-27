import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import { updatePasswordAPI } from '../Services/userServices';

function UpdatePasswordBox({show,setShow}) {
    const [isOldPasswordErrorActive,setIsOldPasswordErrorActive]=useState(true)
    const [isNewPasswordErrorActive,setIsNewPasswordErrorActive]=useState(true)
    const [isConfirmPasswordErrorActive,setIsConfirmPasswordErrorActive]=useState(true)
    
    const closeOldPasswordErrorBtn=()=>{
      setIsOldPasswordErrorActive(false)
    }
    const closeNewPasswordErrorBtn=()=>{
      setIsNewPasswordErrorActive(false)
    }
    const closeConfirmPasswordErrorBtn=()=>{
      setIsConfirmPasswordErrorActive(false)
    }
        

  const closeBtn = ()=>setShow(false)

  const{mutateAsync,isError,error,isPending}= useMutation({
    mutationFn:updatePasswordAPI,
    mutationKey:['update-password']
  })

  const EditPasswordValidationSchema = Yup.object({
    oldPassword:Yup.string()
  .min(6,"Minimum 6 Characters")
  .required("Old Password Required"),
  newPassword:Yup.string()
  .min(6,"Minimum 6 Characters")
  .required("New Password Required"),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref("newPassword"),null],"Passwords must match!")
  .required("Need confirm password")
  })

  const formik = useFormik({
    initialValues:{
      oldPassword:'',
      newPassword:'',
    },
    validationSchema:EditPasswordValidationSchema,
    onSubmit:(values,{resetForm})=>{
      mutateAsync(values)
      .then((data)=>
        {
          setShow(false)
          resetForm()
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
      <h2 className="text-xl mb-1 font-bold max-md:max-w-full">Want to Update your Password?</h2>
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
          {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}

      <input
        type="password"
        name="oldPassword"
        {...formik.getFieldProps("oldPassword")}
         placeholder="Old password here!!"
        className=" justify-center pl-2 mt-2  h-10 rounded-md text-base bg-white max-md:max-w-full"
        onFocus={(()=>{
          setIsOldPasswordErrorActive(true)
        })}
      />
      {isOldPasswordErrorActive ? formik.touched.oldPassword && formik.errors.oldPassword && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeOldPasswordErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.oldPassword}</span>):""}
      
          <input
        type="password"
        name="newPassword"
        {...formik.getFieldProps("newPassword")}
        placeholder="New password here!!"
        className=" justify-center pl-2 mt-2  h-10 rounded-md text-base bg-white max-md:max-w-full"
        aria-label="Type your updated name here"
        onFocus={(()=>{
          setIsNewPasswordErrorActive(true)
        })}
      />
      {isNewPasswordErrorActive ? formik.touched.newPassword && formik.errors.newPassword && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeNewPasswordErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.newPassword}</span>):""}
      
          <input
        type="password"
        name="confirmPassword"
        {...formik.getFieldProps("confirmPassword")}
        placeholder="Re-enter new password again!"
        className=" justify-center pl-2 mt-2  h-10 rounded-md text-base bg-white max-md:max-w-full"
        aria-label="Type your updated name here"
        onFocus={(()=>{
          setIsConfirmPasswordErrorActive(true)
        })}
      />
      {isConfirmPasswordErrorActive ? formik.touched.confirmPassword && formik.errors.confirmPassword && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeConfirmPasswordErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.confirmPassword}</span>):""}

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

export default UpdatePasswordBox;
