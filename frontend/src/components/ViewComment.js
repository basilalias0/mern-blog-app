import  React, { useEffect, useState } from "react";
import proPic from '../Public/Images/proPic.png'
import { deleteCommentAPI, viewCommentAPI } from "../Services/commentServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddCommentBar from "./AddCommentBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faPencil} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import EditComment from "./EditComment";

function Avatar({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-10 aspect-square fill-zinc-300" />;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function AuthorInfo({ name, date }) {
  return (
    <div className="flex flex-col grow shrink-0  basis-0 w-fit">
      <div className="justify-center  text-base font-bold bg-sky-100 text-stone-900">
        {name}
      </div>
      <div className="flex text-sm bg-sky-100 text-neutral-500 self-start">
        Updated at:{formatDate(date)}
      </div>
    </div>
  );
}


function ViewComment({id,author}) {
  const userId =useSelector((state)=>state.auth.user.id)
  const [allComments,setAllComments] = useState([])
  const {data} = useQuery({
    queryKey:['fetch-comments'],
    queryFn:()=>viewCommentAPI(id)
  })
  useEffect(()=>{
    setAllComments(data)
  },[data])

  const queryClient =useQueryClient()

  const {mutateAsync}=useMutation({
    mutationFn:deleteCommentAPI,
    mutationKey:['delete-comment']
  })

  const deleteComment = ({id},commentId)=>{
    mutateAsync({id,commentId})
    .then((data)=>{
      queryClient.invalidateQueries('fetch-comments')
    })
  }

  const handleEditComment = ({id},commentId)=>{
    <EditComment />
    console.log("working");
    //mutateAsync({id,commentId})
    //.then((data)=>{
    //  queryClient.invalidateQueries('fetch-comments')
    //})
  }
  
  return (
    <div>
    <AddCommentBar id ={id}/>
    {allComments?.map((comment)=>{
      return(
        
        <section key={comment?.commentInfo[0]?._id}  className="flex flex-col mt-2 py-1 pr-16 pl-5 bg-sky-100 max-w-[877px] max-md:pr-5">

      <header className="flex gap-2 w-full mt-2 items-start self-start">
        <Avatar src={proPic} alt="Author's Avatar" />
        <AuthorInfo name={comment.authorInfo.name} date={comment.commentInfo[0].createdAt} />
        <div>
        {(author === userId  || comment.commentInfo[0].author === userId  ) ? (<span onClick={()=>deleteComment({id},comment?.commentInfo[0]?._id)} className="close-btn pl-6  float-right cursor-pointer">
        <FontAwesomeIcon icon={faXmark} size="xl" />
          </span> ):""}
        {(comment.commentInfo[0].author === userId  ) ? (<span onClick={handleEditComment} className="close-btn pl-6  float-right cursor-pointer">
          
        <FontAwesomeIcon icon={faPencil} size="lg"/>
          </span> ):""}
        </div>
        
      </header>
      
      <div className="flex self-start pt-1 pb-2 w-full ml-14 text-base bg-sky-100 text-stone-900 max-md:max-w-full">
      {comment?.commentInfo[0]?.content}
    </div>
    </section>
    

      )
    })}
    </div>
    
  );
}

export default ViewComment;

