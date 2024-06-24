import React from 'react';
import Logo from '../Public/Images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import proPic from '../Public/Images/proPic.png'
import searchIcon from '../Public/Images/search icon.png'
import { logoutAPI } from '../Services/userServices';
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../Redux/AuthSlice';

function Navbar() {
    const profile = useSelector((state)=> state.auth.user)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const handleLogout=()=>{

      logoutAPI().then((data)=>{
        Cookies.remove('userData')
        dispatch(logoutAction())
        queryClient.clear()
        navigate('/')
      })
      

    }

  return (
    <div>
    <header className="flex gap-5 justify-between self-stretch px-20 w-full bg-sky-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    
      <div className=" flex align-center 
       justify-center  bg-sky-500">
      <img className=' w-16 h-18' src={Logo} alt='Logo'/>
        <div className='text-4xl font-bold text-center text-white self-center justify-self-center'> BLOG APP </div>
      </div>
      <div className='flex gap-5 w-1/2 max-md:flex-wrap max-md:max-w-full'>
      <form className="flex flex-auto gap-5 justify-between pl-7 my-auto text-base bg-white rounded-3xl text-neutral-500 max-md:flex-wrap max-md:max-w-full">
          <label htmlFor="searchInput" className="sr-only">Search here!</label>
          <input
            className="my-auto w-full focus:outline-none"
            type="text"
            id="searchInput"
            placeholder="Search here!"
            aria-label="Search here!"
          />
          <button>
          <img
            loading="lazy"
            src={searchIcon}
            className="shrink-0 w-12 aspect-square"
            alt=""
          />
          </button>
        </form>
      </div>
      <button className='flex  pl-2  max-md:flex-wrap max-md:max-w-full hover:bg-sky-500'>
      <div className="shrink-0 my-auto w-12 h-12 rounded-full">
        <img src={proPic} alt='Profile Pic'/>
      </div>
          <div className="justify-center  border rounded-lg self-center border-transparent items-start px-4  max-md:pr-5 hover:bg-sky-500">
            {profile?.name}
          </div>
      </button>
      <div className='flex gap-5 max-md:flex-wrap max-md:max-w-full'>
      <div className="flex shrink gap-0 text-xl text-white basis-auto grow-0 items-center justify-items-center">
          <button onClick={handleLogout} className='border border-black w-32 h-12 rounded-lg hover:bg-white hover:text-sky-700' >
          Logout
          </button>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Navbar;
