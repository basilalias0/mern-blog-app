import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentAPI } from '../Services/commentServices';
import Alert from '@mui/material/Alert';





const AddCommentBar = ({id}) => {
  const queryClient = useQueryClient()
    const [isErrorActive,setIsErrorActive]=useState(true)

    const closeContentBtn = ()=>{
      setIsErrorActive(false)
  }

    const{mutateAsync,isError,error,isPending}= useMutation({
        mutationFn:createCommentAPI,
        mutationKey:['add-comment']
    })

        const initialValues = {
          content: '',
          postId:id
        };
      
        const validationSchema = Yup.object({
          content: Yup.string()
            .required('Comment is required to send your reaction!')
            .min(1, 'Comment must contain a character!'),
        })
      
        const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit:(values,{resetForm}) => {
            mutateAsync(values)
            .then((data)=>{
              queryClient.invalidateQueries('fetch-comments')
              resetForm()
            })
           
            
          },
        });

  return (
    <section className="flex flex-col px-2.5 py-2 shadow-md text-base bg-sky-100 max-w-[877px] text-stone-900">
      {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
      {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}
      
      <form onSubmit={formik.handleSubmit} className="flex gap-5 max-md:flex-wrap max-md:mr-2">

      <div className="grow justify-center  my-auto bg-white w-fit max-md:max-w-full">
  
      <input
        id="comment"
        name='content'
        type="text"
        {...formik.getFieldProps('content')}
        placeholder="Add a comment..."
        className="w-full bg-transparent text-base pl-2 text-stone-900 outline-none py-2.5"
        onFocus={(()=>{
          setIsErrorActive(true)
        })}
      />
      </div>
      <button type="submit" className="shrink-0 rounded-full mt-1 bg-white h-[35px] w-[35px]"
      >
        <FontAwesomeIcon icon={faPlus} size="xl" />
      </button>
    </form>
    {isErrorActive ? formik.touched.content && formik.errors.content && (<span className="shrink-0 mt-1.5 text-white bg-red-600 rounded-md h-[35px] max-md:max-w-full pt-1.5 px-2">
        <span onClick={closeContentBtn} className="close-btn pl-2 float-right cursor-pointer">
            &times;
          </span>
          {formik.errors.content}</span>):""}
    </section>
  );
}

export default AddCommentBar;

