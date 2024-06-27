import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Public/Images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import proPic from '../Public/Images/proPic.png'
import { allUserAPI, logoutAPI } from '../Services/userServices';
import Cookies from 'js-cookie'
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
    const handleLinkToProfile = () =>{
      navigate(`/${profile?.username}`)
    }
    
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const{data}=useQuery({
    queryKey:['fetch-all-user-data'],
    queryFn:allUserAPI
  })


    const filterSearchResults = (term) => {
      const filteredResults = data?.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) || item.username.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    };
  
    // Handle user input changes
    const handleInputChange = (event) => {
      
      setSearchTerm(event.target.value);
      filterSearchResults(event.target.value);
      (event.target.value === ""?setShowDropdown(false) :setShowDropdown(true))
    };
  
    // Handle click outside the search bar to close the dropdown
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    // Close the dropdown when the user selects an item
    const handleSelectItem = (username) => {
      setSearchTerm('')
      setSearchResults([]); // Clear search results
      setShowDropdown(false); // Close dropdown
      navigate(`/${username}`)
    };
  
    // Handle escape key press to close the dropdown
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    useEffect(() => {
      // Close dropdown on click outside the component
      document.addEventListener('click', handleClickOutside);
  
      // Handle escape key press
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        // Clean up event listeners on component unmount
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

  return (
    <div>
    <header className="flex gap-5 justify-between self-end px-20 max-w-full bg-sky-500 w-[1920px] max-md:flex-wrap max-md:px-5">
      <button onClick={()=>navigate('/homepage')}>
      <div className=" flex align-center 
       justify-center  bg-sky-500">
      <img className=' w-16 h-18' src={Logo} alt='Logo'/>
        <div className='text-4xl font-bold text-center text-white self-center justify-self-center'> BLOG APP </div>
      </div>
      </button>

      <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
      <form className="flex  w-full  justify-between  my-4 text-base bg-sky-50 rounded-lg  text-neutral-500 max-md:flex-wrap max-md:max-w-full relative items-center justify-center">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search..."
        className="w-full bg-transparent px-3 py-2 rounded-md  focus:outline-none  "
        value={searchTerm}
        onChange={handleInputChange}
      />
          {showDropdown && (
        <ul className="absolute border border-sky-800 mt-3 top-full left-0 w-full bg-white rounded-md shadow-md overflow-y-auto max-h-60">
          {searchResults?.length > 0 ? (
            searchResults?.map((item) => (
              <li
                key={item.id}
                className="flex px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectItem(item.username)}
              >
                <img
                src={item?.profileImage||proPic}
                alt='Profile Pic'
                className='w-10 h-10 mx-2 rounded-full'/>
                <div className='flex flex-col'>
                <span className='text-black'>
                  {item.name}
              </span>
              <span>@{item.username}</span>
                </div>
                
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No results found</li>
          )}
        </ul>
      )}
        </form>
        
        <div className="flex w-full gap-0 text-xl text-white basis-auto ">
          <button  onClick={handleLinkToProfile}  className=' flex items-center justify-center w-aut shrink-0 my-auto'>
          <img className='shrink-0 my-auto w-12 h-12 rounded-full' src={profile?.profileImage||proPic} alt='Profile Pic'/>
          <span className=" justify-center items-start px-4 py-6 bg-sky-500  w-auto pr-5">
            <span >{profile?.name}</span>
          </span>
          
          </button>
          
          <div className='flex gap-5 max-md:flex-wrap max-md:max-w-full'>
      <div className="flex shrink gap-0 text-xl text-white basis-auto grow-0 items-center justify-items-center">
          <button onClick={handleLogout} className='border border-black w-32 h-12 rounded-lg hover:bg-white hover:text-sky-700' >
          Logout
          </button>
        </div>
      </div>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Navbar;
