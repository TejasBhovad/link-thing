import React from "react";
import Image from "next/image";

const ClickCard = (props) => {
  return (
    <a href={props.link}>
      <div className="w-full h-24 flex justify-center items-center md:h-32">
        <div className="card w-11/12 h-4/5  bg-gray-200 rounded flex">
          <div className="emoji h-full aspect-square flex justify-center items-center">
            <div className="emoji-contain h-3/4 w-3/4 bg-gray-200 rounded">
              {/* <props.logo alt={props.logo} className="social-logo" />
               */}
              <Image
                src={props.image}
                width={100}
                height={100}
                alt={props.image}
                className="social-logo"
              />
            </div>
          </div>
          <div className="w-full text-part h-5/6 flex flex-col justify-center items-start">
            <div className="contain-text w-11/12 gap-1 flex flex-col">
              <div className="heading font-bold h-1/3 text-lg md:text-xl text-black">
                {props.heading}
              </div>
              <div className="desc h-2/3 text-gray-600">{props.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ClickCard;
