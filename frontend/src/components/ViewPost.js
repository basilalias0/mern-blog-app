import React, { useEffect, useState } from 'react';
import CommentButton from './CommentButton';
import ViewComment from './ViewComment';
import Alert from '@mui/material/Alert';
import proPic from '../Public/Images/proPic.png'
import { viewPostAPI } from '../Services/postServices';
import heart from '../Public/Images/heart.png'
import likedHeart from '../Public/Images/Likedheart.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addLikeAPI, undoLikeAPI, viewLikesAPI } from '../Services/postServices';
import { useSelector } from 'react-redux';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

function ViewPost({ nOfComments }) {
  const userId = useSelector((state)=>state.auth.user.id)

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  const queryClient = useQueryClient()
  const [post,setPost] = useState([])

  useEffect(()=>{
    viewPostAPI().then((data)=>{
      setPost(data)
    })
    
    
  },[post])
  
  console.log(post);

  

    const likeMutation = useMutation({
        mutationFn:addLikeAPI,
        mutationKey:['add-like']
    })
    const unLikeMutation = useMutation({
        mutationFn:undoLikeAPI,
        mutationKey:['undo-like']
    })

    const handleAddLike =(id)=>{
      likeMutation.mutateAsync(id).then((response)=>{
        console.log(response)
        const newData = post.map((element)=>{
          if(element._id ===response._id){
            return response
          }else{
            return element
          }
        })
        setPost(newData)
        console.log(post);
        queryClient.invalidateQueries('fetch all post')
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
      }).catch((e)=>console.log(e))
    }

  

  return (
    <div className="flex flex-col items-center  bg-sky-50">
      

        {post?.map((element)=>{
            return(
                <article key={element?._id} className="flex flex-col pb-7  max-w-full bg-sky-50 w-[877px] ">
      <div className="flex flex-col items-end pt-2 pr-6 pb-6 pl-3 bg-sky-100 max-md:pr-5 max-md:max-w-full rounded-md">
        <div className="flex gap-2.5 self-start">
        <div className="shrink-0 my-auto w-12 h-12 rounded-full">
        <img src={proPic} alt='Profile Pic'/>
      </div>
          <div className="flex flex-col my-auto">
            <div className="text-base text-stone-900">
              <button>{element?.author?.name}</button>
            </div>
            <div className=" text-base text-neutral-500">
              Created at: {formatDate(element?.createdAt)}
            </div>
          </div>
        </div>
        <div className="justify-center items-start px-2.5 py-5 max-w-full text-xl font-bold bg-sky-100 text-stone-900 w-[800px] max-md:pr-5">
          {element?.title}
        </div>
        <div className="items-start px-2.5 pt-3 pb-28 max-w-full text-xl bg-sky-100 text-stone-900 w-[807px] max-md:pr-5">
          {element?.content}
        </div>
        <div className="flex gap-5 py-1.5 pr-20 max-w-full text-base font-bold bg-sky-100 text-stone-900 w-[807px] max-md:flex-wrap max-md:pr-5">
          <div className="flex gap-4">

          {element?.likedUser?.includes(userId) ?
          (<button onClick={()=>handleUnLike(element._id)}>
              
          <img
            loading="lazy"
            src={likedHeart}
            className="shrink-0 w-8 aspect-square"
            alt=""
          />
          </button>):
          <button onClick={()=>handleAddLike(element._id)}>
              
          <img
          
            loading="lazy"
            src={heart}
            className="shrink-0 w-8 aspect-square"
            alt=""
          />
          </button>
          }
          
            
          
            
            <div className="my-auto">{element?.likedUser?.length || 0} Likes</div>
          </div>
          <div className="flex gap-3">
            <button onClick={toggleDropdown}>
            <CommentButton />
            </button>
            
            <div className="my-auto">{nOfComments} Comments</div>
          </div>
        </div>
      </div>
      <div>
        {isOpen ? <ViewComment/> :""}
        
      </div>
    </article>
            )
        })}

      
    </div>
  );
}

export default ViewPost;