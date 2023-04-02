import React, { useEffect, useRef, useState } from "react";
import { useAppContext, PAGES } from "@/context/app";
import { useImagesContext } from "@/context/images";

const NUM_MAP = new Array(10).fill({});
const SIZE_MAP = ["256x256", "512x512", "1024x1024"];

const Footer: React.FC = () => {
  const enterRef = useRef<HTMLButtonElement>(null);
  const { setPage } = useAppContext();
  const { setImages, options, setOptions, isLoading, setIsLoading } =
    useImagesContext();
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
        <button
          className="text-black min-w-10 h-10 rounded-md px-3 ring-1 ring-inset ring-gray-300 focus-visible:outline-none hover:text-blue-600 hover:ring-blue-400"
          onClick={() => setPage(PAGES.CHAT)}
        >
          去聊天
        </button>

        <div>
          <label>数量：</label>
          <select
            className="h-10 rounded-md px-3 ring-1 ring-inset ring-gray-300 cursor-pointer focus-visible:outline-none hover:ring-blue-400 appearance-none"
            onChange={(e) =>
              setOptions({ ...options, n: Number(e.target?.value ?? 1) })
            }
          >
            {NUM_MAP.map((_, index) => {
              return (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>尺寸：</label>
          <select
            className="h-10 rounded-md px-3 ring-1 ring-inset ring-gray-300 cursor-pointer focus-visible:outline-none hover:ring-blue-400 appearance-none"
            onChange={(e) => setOptions({ ...options, size: e.target?.value })}
          >
            {SIZE_MAP.map((v) => {
              return (
                <option value={v} key={v}>
                  {v}
                </option>
              );
            })}
          </select>
        </div>

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
