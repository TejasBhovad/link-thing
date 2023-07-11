import React from "react";
import Image from "next/image";
import Links from "@/components/Links";

const IntroHor = ({ name, Id, imageUrl, socialLinks }) => {
  const imageSize = 1080;
  return (
    <div className=" h-70 gap-1 w-full flex-col justify-center items-center">
      <div className="image h-auto justify-center flex items-center min-w-[150px]">
        <Image
          src={imageUrl}
          width={imageSize}
          height={imageSize}
          className="object-cover h-24 w-24 rounded-full md:h-40 sm:w-40"
        />
      </div>
      <div className="min-w-[150px] container flex-col justify-center items-center">
        <div className="name mt-2 h-1/3 w-full items-center text-center flex max-h-8 font-semibold text-black text-xl md:text-3xl justify-center">
          {name}
        </div>
        <div className="tag mt-0.5 justify-center h-1/3 w-full flex max-h-8 font-normal text-gray-400 text-lg md:text-xl">
          @{Id}
        </div>
        <div className="links mt-2 w-full md:mb-0 h-auto justify-center flex items-center">
          <Links socialLinks={socialLinks} className="justify-center" />
        </div>
      </div>
    </div>
  );
};

export default IntroHor;
