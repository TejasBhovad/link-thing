import React from "react";

const ClickButton = (props) => {
  return (
    <div className=" w-1/2 h-16 md:h-18 flex justify-center items-center">
      <a
        href="https://svg2jsx.com/"
        className="w-full h-full flex justify-center items-center"
      >
        <div className="card w-11/12 h-4/5  bg-gray-200 rounded-full flex justify-center items-center">
          <div className="heading font-bold text-lg md:text-lg text-black">
            {props.heading}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ClickButton;
