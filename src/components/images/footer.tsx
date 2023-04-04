import React, { useEffect, useRef, useState } from "react";
import request from "@/utils/request";
import { useImagesContext } from "@/context/images";
import Button from "@/components/common/button";
import Input from "@/components/common/Input"

const Footer: React.FC = () => {
  const enterRef = useRef<HTMLButtonElement>(null);
  const { options, setImages, isLoading, setIsLoading } = useImagesContext();
  const [prompt, setPrompt] = useState<string>(""); // 用户对图片的要求

  // 发送：生成图片
  const send = () => {
    setPrompt("");
    setIsLoading(true);
    request.post("/api/images", {
      ...options,
      prompt,
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
        <Input
          className="flex-1"
          placeholder="我想要画一个不卷的世界~"
          value={prompt}
          onChange={(e) => setPrompt(e.target?.value)}
        />

        <Button 
          btnType="primary" 
          onClick={isLoading || !prompt ? undefined : send}
          ref={enterRef}
        >发送</Button>
      </div>
    </footer>
  );
};

export default Footer;
