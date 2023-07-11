import React from "react";
import Image from "next/image";
import Links from "@/components/Links";

const IntroVert = ({ name, Id, imageUrl, socialLinks }) => {
  const imageSize = 1080;
  return (
    <div className=" h-30 w-full flex">
      <div className="image w-1/3 h-full justify-center flex items-center min-w-[150px]">
        <Image
          src={imageUrl}
          width={imageSize}
          height={imageSize}
          className="object-cover h-24 w-24 rounded-full md:h-40 sm:w-40"
        />
      </div>
      <div className="min-w-[150px] container h-full w-2/3 flex-col flex md:justify-center md:gap-1 justify-center">
        <div className="name h-1/3  w-full items-center flex max-h-8 font-semibold text-black text-xl md:text-3xl">
          {name}
        </div>
        <div className="tag h-1/3 w-full flex max-h-8 font-normal text-gray-400 text-lg md:text-xl">
          @{Id}
        </div>
        <div className="links w-full md:mb-0 h-auto">
          <Links socialLinks={socialLinks} />
        </div>
      </div>
    </div>
  );
};

export default IntroVert;
