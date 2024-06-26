import React from 'react';

const ProfileLoading = ()=>{
    return(
    <div className="border mt-5 bg-white  shadow-md rounded-md p-4 w-[877px] mx-auto">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 w-[162px] h-[162px]"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 mt-1 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 mt-1  bg-slate-700 rounded col-span-1"></div>
          <div className="h-2 mt-1  bg-slate-700 rounded col-span-1"></div>
          <div className="h-2 mt-1  bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 mt-1  bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 mt-1 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>)
}
const PostLoading = ()=>{
    return(
        <div className="border mt-5  shadow-md rounded-md bg-sky-100 p-4 w-[877px] mx-auto">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 w-12 h-12"></div>
    <div className="flex-1 space-y-6 py-1">
    <div className="h-2 w-[25%] bg-slate-700 rounded"></div>
      <div className="h-2 w-[25%] bg-neutral-500 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        </div>
        <div className="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        <div className="h-2 mt-1 bg-slate-700 rounded col-span-1"></div>
        <div className="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        <div className="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export function ProfileLoadingScreen() {
  return (
    <>
    <ProfileLoading/>
    <PostLoading/>
    <PostLoading/>
    <PostLoading/>


</>
  );
}

export function HomepageLoadingScreen() {
    return (
      <>
      <PostLoading/>
      <PostLoading/>
      <PostLoading/>
  </>
    );
  }


