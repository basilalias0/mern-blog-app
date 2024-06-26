import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCommentAPI } from '../Services/commentServices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

function CommentEditBox({commentId,postId}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const [isErrorActive,setIsErrorActive]=useState(true)

  const closeContentBtn = ()=>{
      setIsErrorActive(false)
  }
  const queryClient = useQueryClient()

  const{mutateAsync,isError,error,isPending}= useMutation({
    mutationFn:updateCommentAPI,
    mutationKey:['update-comment']
  })

  const EditCommentValidationSchema = Yup.object({
    content:Yup.string().min(1,"Need At least One Character").required("To Update Content Required")
  })

  const formik = useFormik({
    initialValues:{
      postId,
      commentId,
      content:''
    },
    validationSchema:EditCommentValidationSchema,
    onSubmit:(values,{resetForm})=>{
      mutateAsync(values)
      .then((data)=>
        {
          queryClient.invalidateQueries('fetch-comments')
          setShow(false)
          resetForm()
        })
      .catch((e)=>console.log(e))
    }
  })

  return (
    <>
      <button onClick={handleOpen}>
      <FontAwesomeIcon icon={faPencil} size="lg"/>
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
      <h2 className="text-xl mb-1 font-bold max-md:max-w-full">Want to Update your Comment?</h2>
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
        {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}
      <textarea
        id="commentInput"
        name='content'
        {...formik.getFieldProps('content')}
        className=" justify-center pl-2 mt-2 pt-2 rounded-md text-base bg-white max-md:max-w-full"
        placeholder="Type here..."
        aria-label="Type your updated comment here"
        onFocus={(()=>{
          setIsErrorActive(true)
        })}
      />
      {isErrorActive ? formik.touched.content && formik.errors.content && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeContentBtn} className="close-btn pl-2 float-right cursor-pointer">
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

export default CommentEditBox;