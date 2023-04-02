import React from "react";

export interface Image {
  url: string;
  alt?: string;
}

export interface ImagesContext {
  /** 当前图片列表 */
  images: Image[];
  /** 设置当前图片列表 */
  setImages: (msg: Image[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const imagesContext = React.createContext<ImagesContext>({
  images: [],
  setImages: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useImagesContext = () => React.useContext(imagesContext);
