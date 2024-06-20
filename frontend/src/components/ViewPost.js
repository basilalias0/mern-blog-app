import React, { useState, useEffect } from 'react';
import CommentButton from './CommentButton';
import ViewComment from './ViewComment';
import heart from '../Public/Images/heart.png'
import likedHeart from '../Public/Images/Likedheart.png'

function ViewPost({ author, date, title, content,nOfLikes,nOfComments }) {

    // State to track if the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    // Close the dropdown if the click is outside the dropdown element
    if (event.target.closest('.dropdown') === null) {
      setIsOpen(false);
    }
  };

  // Use useEffect to add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center  bg-sky-50">
      <article className="flex flex-col pb-7  max-w-full bg-sky-50 w-[877px] ">
      <div className="flex flex-col items-end pt-2 pr-6 pb-6 pl-3 bg-sky-100 max-md:pr-5 max-md:max-w-full rounded-md">
        <div className="flex gap-2.5 self-start">
          <div className="shrink-0 rounded-full bg-zinc-300 h-[70px] w-[70px]" />
          <div className="flex flex-col my-auto">
            <div className="text-base text-stone-900">
              {author}
            </div>
            <div className=" text-base text-neutral-500">
              Created at: {date}
            </div>
          </div>
        </div>
        <div className="justify-center items-start px-2.5 py-5 max-w-full text-xl font-bold bg-sky-100 text-stone-900 w-[800px] max-md:pr-5">
          {title}
        </div>
        <div className="items-start px-2.5 pt-3 pb-28 max-w-full text-xl bg-sky-100 text-stone-900 w-[807px] max-md:pr-5">
          {content}
        </div>
        <div className="flex gap-5 py-1.5 pr-20 max-w-full text-base font-bold bg-sky-100 text-stone-900 w-[807px] max-md:flex-wrap max-md:pr-5">
          <div className="flex gap-4">
            <button>
            <img
              loading="lazy"
              src={heart}
              className="shrink-0 w-8 aspect-square"
              alt=""
            />
            </button>
            
            <div className="my-auto">{nOfLikes} Likes</div>
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
    </div>
  );
}

export default ViewPost;
