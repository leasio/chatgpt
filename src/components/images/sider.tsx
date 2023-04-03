import React from "react";
import { PAGES, useAppContext } from "@/context/app";
import { useImagesContext } from "@/context/images";
import Select from "@/components/common/select";
import Button from "@/components/common/button";

const NUM_MAP = new Array(10).fill({});
const SIZE_MAP = ["256x256", "512x512", "1024x1024"];

const Header: React.FC = () => {
  const { setPage } = useAppContext();
  const { options, setOptions } = useImagesContext();

  return (
    <div className="w-60 border-r-2 shadow-inner p-4">
      <div className="border-b-2 mb-4 pb-4 space-y-2">
        <div className="flex items-center">
          <label>数量：</label>
          <Select
            className="flex-1" 
            options={NUM_MAP?.map((_, index) => ({ label: index + 1, value: index + 1 }))}
            onChange={(e) =>
              setOptions({ ...options, n: Number(e.target?.value ?? 1) })
            }
          />
        </div>

        <div className="flex items-center">
          <label>尺寸：</label>
          <Select 
            className="flex-1"
            options={SIZE_MAP?.map(v => ({ label: v, value: v }))}
            onChange={(e) => setOptions({ ...options, size: e.target?.value })}
          />
        </div>
      </div>

      <Button 
        btnType="primary" 
        onClick={() => setPage(PAGES.CHAT)}
      >去聊天</Button>
    </div>
  );
};

export default Header;
