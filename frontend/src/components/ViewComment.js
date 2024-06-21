import * as React from "react";
import proPic from '../Public/Images/proPic.png'

function Avatar({ src, alt }) {
  return <img loading="lazy" src={src} alt={alt} className="shrink-0 w-10 aspect-square fill-zinc-300" />;
}

function AuthorInfo({ name, date }) {
  return (
    <div className="flex flex-col grow shrink-0  basis-0 w-fit">
      <button onClick={() => alert(`Author: ${name}`)} className="justify-center  text-base font-bold bg-sky-100 text-stone-900">
        {name}
      </button>
      <button onClick={() => alert(`Date: ${date}`)} className="flex text-sm bg-sky-100 text-neutral-500 self-start">
        {date}
      </button>
    </div>
  );
}

function CommentContent({ text }) {
  return (
    <button onClick={() => alert(`Comment: ${text}`)} className="flex self-start pt-1 pb-2 w-full ml-14 text-base bg-sky-100 text-stone-900 max-md:max-w-full">
      {text}
    </button>
  );
}

function ViewComment() {
  return (
    <section className="flex flex-col mt-2 py-1 pr-16 pl-5 bg-sky-100 max-w-[877px] max-md:pr-5">
      <header className="flex gap-2 mt-2 items-start self-start">
        <Avatar src={proPic} alt="Author's Avatar" />
        <AuthorInfo name="Name of the Author" date="Created Date" />
      </header>
      <CommentContent text="Content of the Comment" />
    </section>
  );
}

export default ViewComment;