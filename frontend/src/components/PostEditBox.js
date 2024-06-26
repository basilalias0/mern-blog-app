import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import { updatePostAPI } from '../Services/postServices';

function PostEditBox({postId}) {
  const [show, setShow] = useState(false);
  const [formData,setFormData] = useState({
    titleInput:'',
    content:""
  })

  const handleClose = () => {
    setShow(false)
    setFormData(formData)
  };
  const handleOpen = () => setShow(true);

  const [isCommentErrorActive,setIsCommentErrorActive]=useState(true)
  const [isTitleErrorActive,setIsTitleErrorActive]=useState(true)

  const closeCommentErrorBtn = ()=>{
      setIsCommentErrorActive(false)
  }
  const closeTitleErrorBtn =()=>{
      setIsTitleErrorActive(false)
  }
  const queryClient = useQueryClient()

  const{mutateAsync,isError,error,isPending}= useMutation({
    mutationFn:updatePostAPI,
    mutationKey:['update-post']
  })

  const EditCommentValidationSchema = Yup.object({
    title:Yup.string().min(3,"Need At least Three Character").required("To Update, Title Required"),
    content:Yup.string().min(5,"Need At least Five Character").required("To Update, Content Required")
  })
  const formik = useFormik({
    initialValues:{
      postId,
      title:'',
      content:''
    },
    validationSchema:EditCommentValidationSchema,
    onSubmit:(values,{resetForm})=>{
      mutateAsync(values)
      .then((data)=>
        {
          queryClient.invalidateQueries('fetch-all-post','fetch-user-data')
          setShow(false)
          resetForm()
        })
      .catch((e)=>console.log(e))
    }
  })

  return (
    <>
      <button onClick={handleOpen}>
      <FontAwesomeIcon icon={faPencil} className='ml-4' size="lg"/>
      </button>
      <div
        className={`fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0 sm:py-8 ${
          show ? 'block' : 'hidden'
        } bg-gray-900 bg-opacity-50 transition-all ease-in-out duration-300`}
      >
        <div
        className={`fixed inset-0 z-50 h-screen  w-screen flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0 sm:py-8 ${
          show ? 'block' : 'hidden'
        } bg-gray-900 bg-opacity-50 transition-all  ease-in-out duration-300`}
      >
        <form onSubmit={formik.handleSubmit} className="flex  flex-col px-9 p rounded-md py-3  max-w-full bg-sky-300 w-[640px] max-md:px-5 max-md:mt-10">
      <h2 className="text-xl mb-1 font-bold max-md:max-w-full">Want to Update your Blog?</h2>
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
      {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}
      <textarea
        id="titleInput"
        name='title'
        {...formik.getFieldProps('title')}
        className=" justify-center pl-2 mt-2 pt-2 h-10 rounded-md text-base bg-white max-md:max-w-full"
        placeholder="Title here..."
        aria-label="Type your updated title here"
        onFocus={(()=>{
          setIsTitleErrorActive(true)
        })}
      />
      {isTitleErrorActive ? formik.touched.title && formik.errors.title && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeTitleErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.title}</span>):""}

      <textarea
        id="contentInput"
        name='content'
        {...formik.getFieldProps('content')}
        className=" justify-center pl-2 mt-2 pt-2 min-h-24 rounded-md text-base bg-white max-md:max-w-full"
        placeholder="Content here..."
        aria-label="Type your updated content here"
        onFocus={(()=>{
          setIsCommentErrorActive(true)
        })}
      />
      {isCommentErrorActive ? formik.touched.content && formik.errors.content && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeCommentErrorBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.content}</span>):""}
      <div className="justify-center self-end px-5 py-2 mt-3 text-center text-white whitespace-nowrap ">
      <button
      
        type="submit"
        className='mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500 hover:bg-sky-600'
      >
        Update
      </button>
      <button type="button"onClick={handleClose} className="mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500 hover:bg-sky-600">
      Close
      </button>
      </div>
    </form>
      </div>
      </div>
    </>
  );
}

export default PostEditBox;