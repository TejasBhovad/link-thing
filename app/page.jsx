
import Nav from "@/components/Nav";
import React from "react";


function Home() {
  return (
    <div className=" w-full h-full flex flex-col">
      <Nav />
      <main className="flex justify-center items-center w-full h-screen">
        <div className=" h-3/5 w-11/12 flex justify-center items-center flex-col gap-8 mb-10">
          <span className="text-7xl font-bold hero-title text-center">
            Links made Simple
          </span>
          <div className="button-link flex text-xl">
            <div className="claim p-2 rounded-l-2xl border border-black border-4">
              LinkThing/
              <input
                className="w-24 ml-0.5 outline-none"
                placeholder="user"
              ></input>
            </div>
            <div className="here bg-black flex justify-center items-center p-2 rounded-r-2xl border-black border-4 text-white px-5 font-semibold">
              <a href="/signup">
                <span>claim link</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
