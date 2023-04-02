import React, { useState } from "react";
import { imagesContext, Image } from "@/context/images";
import Footer from "@/components/images/footer";

const Images: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 是否加载中

  return (
    <imagesContext.Provider
      value={{
        images,
        setImages,
        isLoading,
        setIsLoading,
      }}
    >
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
