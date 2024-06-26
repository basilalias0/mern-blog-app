import React from 'react';

const ProfileLoading = ()=>{
    return(
    <div class="border mt-5  shadow-md rounded-md p-4 w-[877px] mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 w-[162px] h-[162px]"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 mt-1 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 mt-1  bg-slate-700 rounded col-span-1"></div>
          <div class="h-2 mt-1  bg-slate-700 rounded col-span-1"></div>
          <div class="h-2 mt-1  bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 mt-1  bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 mt-1 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>)
}
const PostLoading = ()=>{
    return(
        <div class="border mt-5  shadow-md rounded-md bg-sky-100 p-4 w-[877px] mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 w-12 h-12"></div>
    <div class="flex-1 space-y-6 py-1">
    <div class="h-2 w-[25%] bg-slate-700 rounded"></div>
      <div class="h-2 w-[25%] bg-neutral-500 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        </div>
        <div class="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        <div class="h-2 mt-1 bg-slate-700 rounded col-span-1"></div>
        <div class="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
        <div class="h-2 mb-3 bg-slate-700 rounded col-span-2"></div>
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


