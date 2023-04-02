import React from "react";
import { PAGES, useAppContext } from "@/context/app";
import { useImagesContext } from "@/context/images";

const NUM_MAP = new Array(10).fill({});
const SIZE_MAP = ["256x256", "512x512", "1024x1024"];

const Header: React.FC = () => {
  const { setPage } = useAppContext();
  const { options, setOptions } = useImagesContext();

  return (
    <header className="border-b-2 shadow-inner p-4">
      <div className="flex items-center justify-between">
        <button
          className="text-white min-w-10 h-10 rounded-md px-3 bg-blue-500 focus-visible:outline-none hover:bg-blue-600"
          onClick={() => setPage(PAGES.CHAT)}
        >
          去聊天
        </button>

        <div className="flex items-center space-x-2">
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
              onChange={(e) =>
                setOptions({ ...options, size: e.target?.value })
              }
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
        </div>
      </div>
    </header>
  );
};

export default Header;
