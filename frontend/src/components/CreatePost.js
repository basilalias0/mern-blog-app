import React, { useState } from 'react';
import Arrow from '../Public/Images/right-arrow.png'
import * as Yup from 'yup';
import {useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostAPI } from '../Services/postServices';
import Alert from '@mui/material/Alert';


const createPostValidationSchema = Yup.object({
    title:Yup.string().required("Title of the post must be required!").min(3,"title of the post must be more than 2 characters"),
    content:Yup.string().min(5,"Minimum 5 Characters").required("Content must be required!")
})


function CreatePost() {
    const [isTitleActive,setIsTitleActive]= useState(false)
    const [isContentActive,setIsContentActive]= useState(false)

    const closeTitleBtn = ()=>{
        setIsTitleActive(false)
    }
    const closeContentBtn = ()=>{
        setIsContentActive(false)
    }

    const queryClient = useQueryClient()

    const {isError,error,isPending,mutateAsync} = useMutation({
        mutationKey:['Creating post'],
        mutationFn:createPostAPI  
    })
    const formik = useFormik({
        initialValues:{
                title:'',
                content:''
        },
        validationSchema:createPostValidationSchema,
        onSubmit:(values)=>{
            mutateAsync(values)
            .then((data)=>{
            queryClient.invalidateQueries('fetch all post')
            })
            .catch((e)=>console.log(e))
        }
    })

  return (
    <div className="flex flex-col items-center pb-10 bg-sky-50 ">
        <form onSubmit={formik.handleSubmit} className="flex flex-col px-4 py-3 mt-2.5 max-w-full text-base bg-sky-50 rounded-md text-stone-900 w-[877px] shadow-md">
        <header className="justify-center items-start px-4 py-5 bg-white rounded-md max-md:pr-5 max-md:max-w-full">
          <input
          placeholder='Share your thoughts here!!'
          name='title'
          {...formik.getFieldProps("title")}
          className='w-full focus:outline-none'
          id='title'
          type="text"
          onFocus={(()=>{
            setIsTitleActive(true)
          })}/>
          
        </header>
        {isTitleActive ? formik.touched.title && formik.errors.title && (<span className=" mt-3 w-full bg-red-600 text-white px-4 py-2 rounded shadow-lg">
        <span onClick={closeTitleBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.title}</span>):""}
        <div className="flex gap-5 px-px mt-2.5 max-md:flex-wrap max-md:max-w-full">
          <article className="grow items-start   rounded-md w-fit max-md:pr-5 max-md:max-w-full">
          <textarea
          placeholder='Explain your idea..'
          name='content'
          {...formik.getFieldProps("content")}
          className='w-full focus:outline-none bg-white px-4 mb-2 pt-5'
          rows='4'
          id='content'
          onFocus={(()=>{
            setIsContentActive(true)
          })}
          />
          
          
          </article>
          <div className="flex pl-2 shrink-0 self-end bg-sky-300 rounded-full mt-20 w-14 h-14 fill-sky-300  items-center justify-items-center hover:bg-sky-400">
            <button type='submit'>
            <img
            loading="lazy"
            src={Arrow}
            className="w-10 h-10"
            alt="Arrow to Send"
          />
            </button>
          
          
          </div>
          
        </div>
        {isContentActive ? formik.touched.content && formik.errors.content && (<span className=" mt-3 w-full bg-red-600 text-white px-4 py-2 rounded shadow-lg">
        <span onClick={closeContentBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.content}</span>):""}
      </form>
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px",width:"47%"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
          {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px", width:"47%"}} severity="info"> Loading... </Alert>}
    </div>
  );
}

export default CreatePost;
