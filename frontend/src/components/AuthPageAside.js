import React from 'react';

const AuthPageAside = () => {
  return (
    
      <aside className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <section className="flex z-10 flex-col grow px-8 py-20 w-full font-medium text-white bg-sky-600 rounded-r-md max-md:px-5 max-md:max-w-full">
            <h2 className="mt-3.5 text-5xl max-md:text-4xl">History of Blog App?</h2>
            <p className="mt-12 text-2xl max-md:mt-10">
              Blog app is created as a Learning project, and it’s powered by BASIL ALIAS. <br /><br />
              Blog App is a free app for sharing ideas and memos. <br />
              so, feel free to use...!!! <br />
            </p>
          </section>
        </aside>
  );
}

export default AuthPageAside;
