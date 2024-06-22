import React, { useState } from 'react';

function EditComment() {

    const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false)
};
  const handleOpen = () => setShow(true);

  return (
    <>
      
      <div
        className={`fixed inset-0 z-50 h-screen w-screen flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0 sm:py-8 ${
          show ? 'block' : 'hidden'
        } bg-gray-900 bg-opacity-50 transition-all ease-in-out duration-300`}
      >
        <form className="flex  flex-col px-9 p  py-3  max-w-full bg-sky-300 w-[640px] max-md:px-5 max-md:mt-10">
      <h2 className="text-xl font-bold max-md:max-w-full">Want to Update your Comment?</h2>
      <textarea
        id="commentInput"
        className=" justify-center pl-2 mt-2 text-base bg-white max-md:max-w-full"
        placeholder="Type here..."
        aria-label="Type your updated comment here"
      />
      <div className="justify-center self-end px-5 py-2 mt-3 text-center text-white whitespace-nowrap ">
      <button
        type="submit"
        className='mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500'
      >
        Update
      </button>
      <button onClick={handleClose} className='mx-1 py-2 px-5 rounded-lg border border-white bg-sky-500'
      > Close</button>
      </div>
    </form>
      </div>
    </>
  );
}

export default EditComment;