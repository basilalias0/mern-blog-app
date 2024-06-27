import React, { useState } from "react";
import UpdateNameBox from "./UpdateNameBox";
import UpdateUsernameBox from "./UpdateUsernameBox.js";
import UpdatePasswordBox from "./UpdatePasswordBox.js";
import UpdateProfileImage from "./UpdateProfileImage.js";



function UpdateMenu({setUpdate}) {
    
    const [isUpdateNameOpen,setIsUpdateNameOpen] = useState(false)
    const [isUpdateUsernameOpen,setIsUpdateUsernameOpen] = useState(false)
    const [isUpdatePasswordOpen,setIsUpdatePasswordOpen] = useState(false)
    const [isUpdateProfileImgOpen,setIsUpdateProfileImgOpen] = useState(false)

    const handleUpdateName = ()=>{
        setIsUpdateNameOpen(true)
    }
    const handleUpdateUsername = ()=>{
        setIsUpdateUsernameOpen(true)
    }
    const handleUpdatePassword = ()=>{
        setIsUpdatePasswordOpen(true)
    }
    const handleUpdateProfileImg = ()=>{
        setIsUpdateProfileImgOpen(true)
    }


  return (
    
          
          <aside className="flex flex-col mt-3 z-30 absolute right-4 w-2/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-4 py-4 w-full text-lg text-center bg-sky-100 rounded-lg border border-sky-500 border-solid text-stone-900 max-md:mt-10">
            <button onClick={handleUpdateProfileImg} className="justify-center px-6 py-3.5 mt-2 bg-white rounded-md border border-sky-500 border-solid max-md:px-5 hover:bg-sky-600 hover:text-white">
                Update Profile Image
            </button>    
            <button onClick={handleUpdateName} className="justify-center px-6 py-3.5 mt-2 bg-white rounded-md border border-sky-500 border-solid max-md:px-5 hover:bg-sky-600 hover:text-white">
                Update Name
            </button>
            <button onClick={handleUpdateUsername} className="justify-center px-6 py-3.5 mt-2 bg-white rounded-md border border-sky-500 border-solid max-md:px-5 hover:bg-sky-600 hover:text-white">
                Update Username
            </button>
            <button onClick={handleUpdatePassword} className="justify-center px-6 py-3.5 mt-2 bg-white rounded-md border border-sky-500 border-solid max-md:px-5 hover:bg-sky-600 hover:text-white">
                Update Password
            </button>
            
            
            </div>
            {isUpdateNameOpen && <UpdateNameBox show={isUpdateNameOpen} setShow={setIsUpdateNameOpen} setUpdate={setUpdate}/>}
            {isUpdateUsernameOpen && <UpdateUsernameBox show={isUpdateUsernameOpen} setShow={setIsUpdateUsernameOpen} setUpdate={setUpdate}/>}
            {isUpdatePasswordOpen && <UpdatePasswordBox show={isUpdatePasswordOpen} setShow={setIsUpdatePasswordOpen} setUpdate={setUpdate}/>}
            {isUpdateProfileImgOpen && <UpdateProfileImage show={isUpdateProfileImgOpen} setShow={setIsUpdateProfileImgOpen} setUpdate={setUpdate}/>}
          </aside>
          
        
  );
}

export default UpdateMenu;