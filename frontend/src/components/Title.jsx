import React from "react";

const Title = ({ title, subTitle, align = "center" }) => {
  const alignmentClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
  };

  return (
    <div className={`flex flex-col justify-center ${alignmentClasses[align]}`}>
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900">
        {title}
      </h1>
      <p className="text-base md:text-lg text-gray-500 mt-2 max-w-2xl">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;