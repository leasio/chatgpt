import React, { useState } from "react";

interface Props {
  onClick: () => void;
}

const Enter: React.FC<Props> = ({ onClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <button
      className={`text-white text-3xl w-96 p-4 rounded-xl focus-visible:outline-none bg-blue-400 hover:bg-red-400 ${
        isHover ? "" : "animate-bounce"
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? "[○･｀Д´･ ○]别碰我！！！" : "O(∩_∩)O~来都来啦..."}
    </button>
  );
};

export default Enter;
