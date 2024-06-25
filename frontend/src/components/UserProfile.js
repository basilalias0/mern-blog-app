import  React, { useState } from "react";
import UpdateMenu from "./UpdateMenu";
import CreatePost from "./CreatePost";
import { Button } from "@mui/material";

function Avatar({ size = 162 }) {
  return (
    <div
      className={`shrink-0 mx-auto rounded-full bg-zinc-300`}
      style={{ height: `${size}px`, width: `${size}px` }}
    />
  );
}

function UserProfile() {

  const [isCreateOpen,setIsCreateOpen] =useState(false)
  const [isUpdateOpen,setIsUpdateOpen] =useState(false)

  const toggleCreate=()=>{
    setIsCreateOpen(!isCreateOpen)
  }
  const toggleUpdate=()=>{
    setIsUpdateOpen(!isUpdateOpen)
  }

  return (
    <main className="flex flex-col pb-10">
     
      <section className="self-center px-14 py-5 mb-2 mt-2.5 max-w-full bg-sky-50 rounded-xl w-[877px] shadow-md max-md:px-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
            <Avatar />
          </div>
          <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
            <article className="flex flex-col grow  text-2xl max-md:mt-10 max-md:max-w-full">
              <h1 className="text-2xl text-stone-900 max-md:max-w-full">
                NAME OF THE USER
              </h1>
              <p className="mt-2 text-xl text-stone-900 max-md:max-w-full">@username</p>
              <p className="mt-1 text-xl text-stone-900 max-md:max-w-full">email@user</p>
              <div className="flex gap-3.5 mt-7 text-center max-md:flex-wrap max-md:max-w-full">
                

                <Button onClick={toggleUpdate}>Edit Profile</Button>
                <Button onClick={toggleCreate}>Create Post</Button>
              </div>
            </article>
          </div>
        </div>
      </section>
      { isUpdateOpen && <UpdateMenu/>}
      { isCreateOpen && <CreatePost/>}
    </main>
  );
}

export default UserProfile;