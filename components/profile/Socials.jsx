import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import SocialMediaInput from "@/components/SocialMediaInput";

const Socials = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 text-3xl font-semibold flex items-center justify-start px-8">
        Social Links
      </div>
      <div className="flex-grow h-full w-full px-8">
        <div className="h-full w-4/5 flex flex-col gap-3">
          <div className="text-md h-10 flex items-center justify-start">
            Add Links
          </div>

          <div className="w-full h-1/2 rounded-md flex bg-white flex flex-col gap-5 form">
            <SocialMediaInput />
            <SocialMediaInput />
            <SocialMediaInput />
            <SocialMediaInput />
          </div>

          {/* Button */}
          <Button className="w-32 text-lg mt-5">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Socials;
