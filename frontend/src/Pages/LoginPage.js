import * as React from "react";
import '../Public/Stylesheet.css'
import Logo from '../Public/Images/logo.png'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik } from 'formik';
import * as Yup from 'yup';
import AuthPageAside from "../components/AuthPageAside";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../Services/userServices";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/AuthSlice";
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie'


function SectionHeader({ title, imageSrc, imageAlt }) {
  return (
    <header className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-[76%] max-md:ml-0 max-md:w-full">
        <h1 className="mt-16 text-6xl font-extrabold text-sky-600 max-md:mt-10 max-md:text-4xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-col ml-5 w-[20%] max-md:ml-0 max-md:w-full">
        <img
          loading="lazy"
          src={imageSrc}
          alt={imageAlt}
          className="shrink-0 max-w-full aspect-[1.11] w-[133px] max-md:mt-10"
        />
      </div>
    </header>
  );
}

const signInValidationSchema = Yup.object({
  username:Yup.string().required("Username required"),
  password:Yup.string().min(6,"Minimum 6 Characters").required("Password Required")
})

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {mutateAsync,isError,isPending,error} = useMutation({
    mutationKey:['login'],
    mutationFn:loginAPI
  })

  const formik = useFormik({
    initialValues:{
        username:"",
        password:""
    },
    validationSchema: signInValidationSchema,
    onSubmit:(values)=>{
            mutateAsync(values)
            .then((data)=>{
                dispatch(loginAction(data))
                Cookies.set("userData",JSON.stringify(data),{expires:1})
                navigate('/feeds')
            })
            .catch((e)=>console.log(e))
            
        }
     })

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 h-screen">
      <div className="flex items-center justify-center h-full">
    <div className="pl-12 bg-white rounded-lg border border-sky-700 border-solid shadow-sm max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <main className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
          <SectionHeader
            title="Sign In."
            imageSrc={Logo}
            imageAlt="Sign in icon"
          />
          {isError && <Alert style={{fontWeight:"bold",textTransform:"uppercase", marginTop:"10px"}} severity="error"> {error?.response?.data?.message} !!! </Alert>}
          {isPending && <Alert style={{fontWeight:"bold",textTransform:"uppercase",marginTop:"10px"}} severity="info"> Loading... </Alert>}
          <form onSubmit={formik.handleSubmit} className="flex flex-col max-md:max-w-full">
          <div className="mb-4 pt-4">
          <input
            type="text"
            id="username"
            placeholder="Username*"
            {...formik.getFieldProps("username")}
            className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {formik.touched.username && formik.errors.username && (<span style={{color:"red"}}>{formik.errors.username}</span>)}
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            placeholder="Password*"
            {...formik.getFieldProps("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
            required
          />
          {formik.touched.password && formik.errors.password && (<span style={{color:"red"}}>{formik.errors.password}</span>)}
        </div>
            <button
              type="submit"
              className="items-center px-10 pt-4 pb-4  text-lg font-medium text-center text-sky-200 bg-sky-800 rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full"
            >
              Let’s Explore!!
            </button>
          </form>
          <p className="mt-20 text-xl font-medium text-slate-600 max-md:mt-10 max-md:max-w-full">
            Don’t have an account?
          </p>
          <Link to="/signup" className="pb-12 text-xl font-medium underline text-stone-900 max-md:max-w-full">Create One Now!!!</Link>
        </main>
        <AuthPageAside/>
      </div>
    </div>
    </div>
    </div>
  );
}

export default LoginPage;