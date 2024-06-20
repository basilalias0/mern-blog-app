import * as React from "react";

function Header() {
  return (
    <header className="flex gap-5 justify-between self-stretch px-20 w-full bg-sky-500 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <h1 className="justify-center px-2 py-4 text-4xl font-bold text-center text-white bg-sky-500">BLOG APP</h1>
      <nav className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
        <form className="flex flex-auto gap-5 justify-between pl-7 my-auto text-base bg-sky-50 rounded-3xl text-neutral-500 max-md:flex-wrap max-md:max-w-full">
          <label htmlFor="searchInput" className="sr-only">Search</label>
          <input className="my-auto" type="text" id="searchInput" placeholder="Search here!" aria-label="Search" />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/94076570f5048c72c64dee235d6a5ac6202eab0cd716aae3d62583866013d667?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&" alt="" className="shrink-0 w-12 aspect-square" />
        </form>
        <div className="flex shrink gap-0 text-xl text-white basis-auto grow-0">
          <img loading="lazy" src="#" alt="User avatar" className="shrink-0 my-auto w-12 h-12 rounded-full bg-zinc-300" />
          <div className="justify-center items-start px-4 py-6 bg-sky-500 max-md:pr-5">Name of the User</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/668b4ab2b59887a5a895ea469906ed1947f73180b4b2d5d0c6d81dac3a5a2c5d?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&" alt="" className="shrink-0 w-16 aspect-square" />
        </div>
      </nav>
    </header>
  );
}

function PostForm() {
  return (
    <form className="flex flex-col px-4 py-3 mt-2.5 max-w-full text-base bg-sky-50 rounded-md text-stone-900 w-[877px]">
      <label htmlFor="postContent" className="sr-only">Share your thought</label>
      <textarea id="postContent" className="justify-center items-start px-4 py-5 bg-white rounded-md max-md:pr-5 max-md:max-w-full" rows="3" placeholder="Share your thought here!!" aria-label="Share your thought"></textarea>
      <div className="flex gap-5 px-px mt-2.5 max-md:flex-wrap max-md:max-w-full">
        <label htmlFor="explanation" className="sr-only">Explain</label>
        <textarea id="explanation" className="grow items-start px-4 pt-5 pb-20 bg-white rounded-md w-fit max-md:pr-5 max-md:max-w-full" rows="10" placeholder="Explain it!!" aria-label="Explain"></textarea>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/71aec23f2d8bd03a874c7e2a208817f6bc8b02f0571b6ac72c127096c597a86b?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&" alt="" className="shrink-0 self-end mt-20 aspect-square fill-sky-300 w-[60px] max-md:mt-10" />
      </div>
    </form>
  );
}

function PostDetails({ creatorImg, creatorName, createdAt, title, content, likes, comments }) {
  return (
    <article className="flex flex-col pb-7 mt-4 max-w-full bg-sky-50 w-[877px]">
      <header className="flex flex-col items-end pt-2 pr-6 pb-6 pl-3 bg-sky-100 max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-2.5 self-start">
          <img loading="lazy" src={creatorImg} alt="Creator avatar" className="shrink-0 aspect-square fill-zinc-300 w-[70px]" />
          <div className="flex flex-col my-auto">
            <div className="text-base text-stone-900">{creatorName}</div>
            <time className="mt-3.5 text-base text-neutral-500">Created at: {createdAt}</time>
          </div>
        </div>
      </header>
      <div className="justify-center items-start px-2.5 py-5 mt-3.5 max-w-full text-xl font-bold bg-sky-100 text-stone-900 w-[800px] max-md:pr-5">
        {title}
      </div>
      <div className="items-start px-2.5 pt-3 pb-28 mt-5 max-w-full text-xl bg-sky-100 text-stone-900 w-[807px] max-md:pr-5">
        {content}
      </div>
      <footer className="flex gap-5 py-1.5 pr-20 mt-4 max-w-full text-base font-bold bg-sky-100 text-stone-900 w-[807px] max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ec178bcada4d5de6a3b35cc1cd2c9945fa55dec93f720bd75d57ddd358276a3?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&" alt="" className="shrink-0 w-10 aspect-square" />
          <div className="my-auto">{likes} Likes</div>
        </div>
        <div className="flex gap-3">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/65dca9f70f253d50071fe267912b6d59bddb574c81a7e0ca6add662be5ddf6b2?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&" alt="" className="shrink-0 w-10 aspect-square" />
          <div className="my-auto">{comments} Comments</div>
        </div>
      </footer>
    </article>
  );
}

function Comment({ commenterImg, commenterName, commentDate, commentContent }) {
  return (
    <form className="flex flex-col py-2.5 pr-14 pl-5 max-w-full bg-sky-100 w-[877px] max-md:pr-5">
      <div className="flex gap-4 max-w-full w-[396px]">
        <img loading="lazy" src={commenterImg} alt="Commenter avatar" className="shrink-0 aspect-square fill-zinc-300 w-[70px]" />
        <div className="flex flex-col grow shrink-0 self-start mt-5 basis-0 w-fit">
          <div className="flex flex-col items-start py-0.5 pr-20 pl-3 bg-sky-100 max-md:pr-5">
            <div className="text-base font-bold text-stone-900">{commenterName}</div>
            <time className="mt-2.5 text-sm text-neutral-500">{commentDate}</time>
          </div>
          <div className="shrink-0 ml-3 max-w-full bg-sky-100 h-[19px] w-[269px] max-md:ml-2.5" />
        </div>
      </div>
      <div className="self-end pt-2 pb-11 mt-5 text-base bg-sky-100 text-stone-900 max-md:max-w-full">
        {commentContent}
      </div>
    </form>
  );
}

function BlogApp() {
  return (
    <div className="flex flex-col items-center pb-20 bg-sky-50">
      <Header />
      <PostForm />
      <PostDetails
        creatorImg="https://cdn.builder.io/api/v1/image/assets/TEMP/7fd5591d68c4fb5d6e97ac5a77913f1a4687e7c0792208df5e08d0c4ea6f1ef7?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&"
        creatorName="Name of the Creator"
        createdAt="Date"
        title="Title of the content"
        content="Content of the post"
        likes="0"
        comments="0"
      />
      <Comment
        commenterImg="https://cdn.builder.io/api/v1/image/assets/TEMP/7fd5591d68c4fb5d6e97ac5a77913f1a4687e7c0792208df5e08d0c4ea6f1ef7?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&"
        commenterName="Name of the Author"
        commentDate="Created Date"
        commentContent="Content of the Comment"
      />
    </div>
  );
}

export default BlogApp;