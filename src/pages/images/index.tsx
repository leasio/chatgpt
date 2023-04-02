import React, { useState } from "react";
import { Options, Image, imagesContext } from "@/context/images";
import Header from "@/components/images/header";
import Footer from "@/components/images/footer";

const DEFAULT_OPTIONS: Options = {
  n: 1,
  size: "256x256",
};

const Images: React.FC = () => {
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [images, setImages] = useState<Image[]>([]); // 生成的图片
  const [isLoading, setIsLoading] = useState<boolean>(false); // 是否加载中

  return (
    <imagesContext.Provider
      value={{
        options,
        setOptions,
        images,
        setImages,
        isLoading,
        setIsLoading,
      }}
    >
      <Header />

      <main className="flex-1 justify-center overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 rounded-full border-4 border-t-gray-300 border-r-gray-300 border-b-blue-400 border-l-blue-400 animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-wrap p-4 max-h-full overflow-hidden overflow-y-auto">
            {images.map((image, index) => {
              return (
                <img
                  className="mr-2 mb-2"
                  src={image.url}
                  alt={image.alt}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </imagesContext.Provider>
  );
};

export default Images;
