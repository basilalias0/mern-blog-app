// src/components/CommentButton.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

const CommentButton = () => {
  

  return (
    <div className="relative inline-block text-left dropdown pt-2">
      <div>
        <button
          className="inline-flex justify-center w-full text-sm font-medium focus:outline-none"
        >
         <FontAwesomeIcon icon={faCommentDots} size="2xl" />
        </button>
      </div>
      
          
        </div>
  );
};

export default CommentButton;