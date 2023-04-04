import React, { useState } from "react";
import { PAGES, appContext } from "@/context/app";
import Enter from "@/components/common/enter";

const PageCompMap = {
  [PAGES.CHAT]: React.lazy(() => import("@/pages/chat")),
  [PAGES.IMAGES]: React.lazy(() => import("@/pages/images")),
};

const App: React.FC = () => {
  const [page, setPage] = useState<PAGES | undefined>();

  // 选择功能页面
  const renderPage = () => {
    const Comp = page && PageCompMap[page];

    return Comp && (
      <React.Suspense fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-t-gray-300 border-r-gray-300 border-b-blue-400 border-l-blue-400 animate-spin"></div>
        </div>
      }>
        <Comp />
      </React.Suspense>
    );
  };

  return (
    <appContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {page ? (
        <div className="w-screen h-screen">
          <div className="h-full transition-all p-4">
            <div className="h-full overflow-hidden border rounded-md shadow-md">
              <div className="flex w-full h-full">{renderPage()}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <Enter />
        </div>
      )}
    </appContext.Provider>
  );
};

export default App;
