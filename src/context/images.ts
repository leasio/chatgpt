import React from "react";

export interface Options {
  n?: number;
  size?: string;
}

export interface Image {
  url: string;
  alt?: string;
}

export interface ImagesContext {
  /** 当前配置 */
  options: Options;
  /** 设置配置 */
  setOptions: (options: Options) => void;
  /** 当前图片列表 */
  images: Image[];
  /** 设置当前图片列表 */
  setImages: (msg: Image[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const imagesContext = React.createContext<ImagesContext>({
  options: {},
  setOptions: () => {},
  images: [],
  setImages: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useImagesContext = () => React.useContext(imagesContext);
