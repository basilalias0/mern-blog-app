import React from 'react';

function ErrorPage() {
  return (
    <div>
      <div className='w-full h-screen flex items-center justify-center text-gradient-to-r from-sky-500 to-indigo-500'>
        <div>
            <div className='text-9xl font-black subpixel-antialiased tracking-widest text-sky-500 '>404</div>
            <div className='text-9xl font-black subpixel-antialiased tracking-widest text-sky-600'>Page Not Found</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
