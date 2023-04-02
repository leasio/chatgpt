import React, { useState } from "react";

const LIMIT_NUM = 3;

interface Props {
  onClick: () => void;
}

const Enter: React.FC<Props> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [count, setCount] = useState<number>(LIMIT_NUM - 1);

  const onClick = () => {
    if (!count) {
      props.onClick();
    }

    setCount(count - 1);
  };

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
