import React from 'react';
import Arrow from '../Public/Images/right-arrow.png'

function CreatePost() {
  return (
    <div className="flex flex-col items-center pb-10 bg-sky-50 ">
        <form className="flex flex-col px-4 py-3 mt-2.5 max-w-full text-base bg-sky-50 rounded-md text-stone-900 w-[877px] shadow-md">
        <header className="justify-center items-start px-4 py-5 bg-white rounded-md max-md:pr-5 max-md:max-w-full">
          <input
          placeholder='Share your thoughts here!!'
          name='titleInput'
          className='w-full focus:outline-none'
          id='titleInput'
          type="text"/>
        </header>
        <div className="flex gap-5 px-px mt-2.5 max-md:flex-wrap max-md:max-w-full">
          <article className="grow items-start px-4 pt-5 pb-5 bg-white rounded-md w-fit max-md:pr-5 max-md:max-w-full">
          <textarea
          placeholder='Explain your idea..'
          name='contentInput'
          className='w-full focus:outline-none'
          rows='4'
          id='contentInput'
          />
          </article>
          <div className="flex pl-2 shrink-0 self-end bg-sky-300 rounded-full mt-20 w-14 h-14 fill-sky-300  items-center justify-items-center hover:bg-sky-400">
            <button type='submit'>
            <img
            loading="lazy"
            src={Arrow}
            className="w-10 h-10"
            alt="Arrow to Send"
          />
            </button>

          
          </div>
        </div>
      </form>
      
    </div>
  );
}

export default CreatePost;
