import React from "react";

const Title = (props) => {
  const { align } = props;

  return (
    <div
      className={`flex justify-${align} items-center h-8 font-bold text-xl mt-2 mb-1 ml-7`}
    >
      {props.heading}
    </div>
  );
};

export default Title;
