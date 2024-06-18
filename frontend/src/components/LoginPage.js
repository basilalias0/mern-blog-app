import * as React from "react";
import './input.css'


function LoginPage() {
  const externalLinks = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/374cc7035257d9db613d9844526c197c655d1222a8fefae68437b064864d8f29?apiKey=5c025788d7dd4263bf85a4f7bfa9ed1a&", name: "Google", alt: "Google icon" }
  ];

  return (
    <div className="flex flex-col px-12 pt-10 pb-20 bg-white leading-[150%] max-md:px-5">
      <header>
        <h1 className="self-start text-xl font-semibold tracking-normal text-black max-md:max-w-full">
          App
        </h1>
      </header>

      <main className="flex flex-col self-center px-1.5 pt-5 pb-2 mt-72 max-w-full text-base bg-white rounded-lg border border-black border-solid w-[400px] max-md:mt-10">
        <h2 className="self-center text-2xl font-semibold tracking-tight text-center text-black">
          Create an account
        </h2>
        <p className="self-center mt-5 tracking-normal text-center text-black">
          Enter your email to sign up for this app
        </p>

        <form className="flex flex-col justify-center items-start mt-6 space-y-4">
          <label htmlFor="emailInput" className="sr-only">
            Email
          </label>
          <input
            className="w-full px-5 py-3 text-xl font-medium whitespace-nowrap bg-white rounded-lg border border-black border-solid text-neutral-400 max-md:px-5"
            type="email"
            id="emailInput"
            placeholder="email@domain.com"
            aria-label="Enter your email"
          />
          <button
            className="w-full justify-center items-center px-16 py-3.5 font-medium text-center text-white bg-black rounded-lg max-md:px-5"
            type="submit"
          >
            Sign up with email
          </button>
        </form>

        <section className="flex gap-3.5 items-center px-px mt-7 text-center text-neutral-400">
          <hr className="flex-1 border border-solid bg-neutral-400 border-neutral-400" />
          <span>or continue with</span>
          <hr className="flex-1 border border-solid bg-neutral-400 border-neutral-400" />
        </section>

        {externalLinks.map((link, index) => (
          <button
            key={index}
            className="hover:bg-stone-950 hover:text-green-300 flex gap-5 px-4 py-2.5 mt-4 text-lg font-medium text-center whitespace-nowrap rounded-lg bg-zinc-100 text-zinc-800"
          >
            <img
              loading="lazy"
              src={link.src}
              alt={link.alt}
              className="shrink-0 w-7 aspect-square"
            />
            <span className="flex-auto">{link.name}</span>
          </button>
        ))}

        <p className="self-center mt-6 leading-6 text-center text-zinc-500">
          <span className="text-zinc-600">
            By clicking continue, you agree to our
          </span>{" "}
          <span className="text-black">Terms of Service</span>{" "}
          <span className="text-zinc-500">and</span>{" "}
          <span className="text-black">Privacy Policy</span>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;