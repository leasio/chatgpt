import React, { useEffect, useRef, useState } from "react";
import { useImagesContext } from "@/context/images";

const Footer: React.FC = () => {
  const enterRef = useRef<HTMLButtonElement>(null);
  const { options, setImages, isLoading, setIsLoading } = useImagesContext();
  const [prompt, setPrompt] = useState<string>(""); // 用户对图片的要求

  // 发送：生成图片
  const send = () => {
    setPrompt("");
    setIsLoading(true);
    fetch("/api/images", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        ...options,
        prompt,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImages(data.data ?? [{ url: "", alt: data.message }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // 键盘快捷键
    window.onkeydown = (event) => {
      switch (event.keyCode) {
        default:
          break;
        case 13: // Enter
          event.preventDefault();
          enterRef.current?.click();
          break;
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, []);

  return (
    <footer className="border-t-2 shadow-inner p-4">
      <div className="flex items-center justify-between space-x-2">
        <input
          className="flex-1 block min-w-10 w-full h-10 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:h-10 focus-visible:outline-none resize-none px-3 py-2"
          type="text"
          placeholder="我想要画一个不卷的世界~"
          value={prompt}
          onChange={(e) => setPrompt(e.target?.value)}
        />

        <button
          className={`text-white min-w-10 h-10 rounded-md px-3 bg-blue-500 focus-visible:outline-none ${
            isLoading || !prompt
              ? "text-gray-500 bg-gray-200 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
          onClick={isLoading || !prompt ? undefined : send}
          ref={enterRef}
        >
          发送
        </button>
      </div>
    </footer>
  );
};

export default Footer;
