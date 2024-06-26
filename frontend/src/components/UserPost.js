import React, { useEffect, useState } from 'react';
import CommentButton from './CommentButton';
import ViewComment from './ViewComment';
import proPic from '../Public/Images/proPic.png'
import { faHeart as fhs } from '@fortawesome/free-solid-svg-icons'
import { faHeart as fhr } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLikeAPI, deletePostAPI, undoLikeAPI} from '../Services/postServices';
import { useSelector } from 'react-redux';
import PostEditBox from './PostEditBox';
import {faXmark} from '@fortawesome/free-solid-svg-icons'




function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

function UserPost({data,authorName,profileImage}) {
  const userId = useSelector((state)=>state.auth?.user?.id)


  const [post,setPost] = useState(data)

  const queryClient = useQueryClient()

  
  useEffect(()=>{
    setPost(data)
  },[data])

    const likeMutation = useMutation({
        mutationFn:addLikeAPI,
        mutationKey:['add-like']
    })
    const unLikeMutation = useMutation({
        mutationFn:undoLikeAPI,
        mutationKey:['undo-like']
    })
    const deletePostMutation = useMutation({
      mutationFn:deletePostAPI,
      mutationKey:['delete-post']
    })

    const handleAddLike =(id)=>{
      likeMutation.mutateAsync(id).then((response)=>{
        const newData = post.map((element)=>{
          if(element._id ===response._id){
            return response
          }else{
            return element
          }
        })
        setPost(newData)
      }).catch((e)=>console.log(e))
    }
    const handleUnLike =(id)=>{
      unLikeMutation.mutateAsync(id).then((response)=>{
        const newData = post?.map((element)=>{
          if(id ===response._id){
            return response
          }else{
            return element
          }
        })
        setPost(newData)
        queryClient.invalidateQueries()
      }).catch((e)=>console.log(e))
    }

    const [isOpen, setIsOpen] = useState({show:false,id:null});
 
    const handleCommentDropdown = (id) =>{
      setIsOpen((prev)=>({show:!prev.show,id}))
    }

    const handleDeletePost = (id)=>{
      deletePostMutation.mutateAsync(id)
      .then((data)=>{
        queryClient.invalidateQueries('fetch-user-data')
      })
    }

  return (
    <div className="flex flex-col items-center  ">
   

        {post?.map((element)=>{
            return(
                <article key={element?._id} className="flex flex-col pb-7  max-w-full   w-[877px] ">
      <div className="flex flex-col items-end pt-2 pr-6 pb-6 pl-3 bg-sky-100 max-md:pr-5 max-md:max-w-full rounded-t-md shadow-md ">
        <div className="flex gap-2.5 self-start w-full pl-2 pt-2">
        
        <div className="shrink-0 my-auto w-12 h-12 rounded-full">
        <img src={profileImage||proPic} alt='Profile Pic' className='shrink-0 mx-auto rounded-full w-12 h-12  bg-zinc-300'/>
      </div>
          <div className="flex flex-col my-auto">
            <div className="text-base font-bold text-stone-900">
              <button>{authorName}</button>
            </div>
            <div className=" text-base text-neutral-500">
              Updated at: {formatDate(element?.createdAt)}
            </div>
          </div>
          
          { (element?.author === userId) && <PostEditBox postId={element?._id}/> }
          {(element?.author === userId ) ? (<span onClick={()=>handleDeletePost(element?._id)} className=" ">
        <FontAwesomeIcon icon={faXmark} className='ml-4 mt-3 cursor-pointer' size="xl" />
          </span> ):""}
          
        </div>
        <div className="justify-center items-start px-2.5 pt-5 pb-1 max-w-full text-xl font-bold bg-sky-100 text-stone-900 w-[800px] max-md:pr-5">
          {element?.title}
        </div>
        <div className="items-start px-2.5 pt-3 pb-4 max-h-40 overflow-auto max-w-full text-xl bg-sky-100 text-stone-900 w-[807px] max-md:pr-5">
          {element?.content}
        </div>
        <div className="flex gap-5 py-1.5 pr-20 max-w-full text-base font-bold bg-sky-100 text-stone-900 w-[807px] max-md:flex-wrap max-md:pr-5">
          <div className="flex gap-4">

          {element?.likedUser?.includes(userId) ?
          (<button onClick={()=>handleUnLike(element._id)}>
              
              <FontAwesomeIcon icon={fhs} size="2xl" style={{color: "#ff0000",}} />
          </button>):
          <button onClick={()=>handleAddLike(element._id)}>
              <FontAwesomeIcon icon={fhr} size="2xl" />
              
          </button>
          }
            
            <div className="my-auto">{element?.likedUser?.length || 0} Likes</div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>handleCommentDropdown(element._id)}>
            <CommentButton />
            </button>
            
            <div className="my-auto">{element.comments.length} Comments</div>
          </div>
        </div>
      </div>
      <div className='max-h-64 overflow-auto snap-mandatory snap-always mb-1'>
        {isOpen.show && isOpen.id === element._id && <ViewComment author={element.author._id} id={element._id}  />}
        
      </div>
    </article>
            )
        })}

    
    </div>
  );
  
}

export default UserPost;