import React from "react";
import { Bold } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Part */}
      <div className="bg-blue-200 md:w-3/5 flex-shrink-0 overflow-y-auto h-screen snap-center">
        <div className="h-full">
          <div className="h-1/3 bg-black text-white">
            <div className="h-4/5 flex justify-center items-center text-8xl md:text-9xl">
              <span className="font-bold">Link</span>
              <span className="font-extralight">Thing</span>
            </div>
            <div className="h-1/5 bg-gradient-to-t from-gray-800 via-black to-black flex">
              <div className="w-1/5 h-full flex justify-center items-center text-md md:text-xl">
                about-align
              </div>
              <div className="w-4/5 h-full flex justify-start items-center ">
                <Toggle
                  variant="outline"
                  aria-label="Toggle bold vertical"
                  className="ml-5"
                >
                  <span className="text-md md:text-xl">Vertical</span>
                </Toggle>
                <Toggle
                  variant="outline"
                  aria-label="Toggle bold horizontal"
                  className="ml-5"
                >
                  <span className="text-md md:text-xl">Horizontal</span>
                </Toggle>
              </div>
            </div>
          </div>
          <div className="h-2/3 bg-white"></div>
        </div>
      </div>

      {/* Right Part */}
      <div className="bg-gray-300 md:w-2/5 flex-1 overflow-y-auto h-screen snap-center">
        {/* Create a preview of the page */}
      </div>
    </div>
  );
};

export default Admin;
