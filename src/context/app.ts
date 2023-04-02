import React from "react";

export enum PAGES {
  CHAT = "CHAT",
  IMAGES = "IMAGES",
}

export interface AppContext {
  /** 当前页面 */
  page?: PAGES;
  /** 设置当前页面 */
  setPage: (page?: PAGES) => void;
}

export const appContext = React.createContext<AppContext>({
  setPage: () => {},
});

export const useAppContext = () => React.useContext(appContext);
