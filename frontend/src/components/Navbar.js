import React from 'react';
import Logo from '../Public/Images/logo.png'
import { useSelector } from 'react-redux';

function Navbar() {
    const selector = useSelector
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/94076570f5048c72c64dee235d6a5ac6202eab0cd716aae3d62583866013d667?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&"
            className="shrink-0 w-12 aspect-square"
            alt=""
          />
          </button>
        </form>
      </div>
      <button className='flex bg-sky-600 pl-2 border rounded-lg max-md:flex-wrap max-md:max-w-full hover:bg-sky-500'>
      <div className="shrink-0 my-auto w-12 h-12 rounded-full bg-zinc-300" />
          <div className="justify-center  border rounded-lg self-center border-transparent items-start px-4  max-md:pr-5 hover:bg-sky-500">
            {"user"}
          </div>
      </button>
      <div className='flex gap-5 max-md:flex-wrap max-md:max-w-full'>
      <div className="flex shrink gap-0 text-xl text-white basis-auto grow-0 items-center justify-items-center">
          <button className='border border-black w-32 h-12 rounded-lg hover:bg-white hover:text-sky-700' >
          Logout
          </button>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Navbar;
