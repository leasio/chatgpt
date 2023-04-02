import React from "react";

export interface Image {
  url: string;
  alt?: string;
}

export interface Options {
  n?: number;
  size?: string;
}

export interface ImagesContext {
  /** 当前图片列表 */
  images: Image[];
  /** 设置当前图片列表 */
  setImages: (msg: Image[]) => void;
  options: Options;
  setOptions: (options: Options) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const imagesContext = React.createContext<ImagesContext>({
  images: [],
  setImages: () => {},
  options: {},
  setOptions: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useImagesContext = () => React.useContext(imagesContext);
