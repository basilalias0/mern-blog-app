// src/components/CommentButton.js

import React from 'react';
import CommentIcon from '../Public/Images/comment.png';
import ViewComment from './ViewComment';

const CommentButton = () => {
  

  return (
    <div className="relative inline-block text-left dropdown pt-2">
      <div>
        {/* Button to toggle the dropdown */}
        <button
          className="inline-flex justify-center w-full text-sm font-medium focus:outline-none"
        >
          <img src={CommentIcon} alt='comment icon' className='shrink-0 w-8 aspect-square'/>
        </button>
      </div>
      
          
        </div>
  );
};

export default CommentButton;

<ViewComment authorName="Name of the Author" createdDate="Created Date" content="Content of the Comment" />