import React, { useState } from "react";
import { PAGES, appContext } from "@/context/app";
import Enter from "@/components/common/enter";
import Chat from "@/pages/chat";
import Images from "@/pages/images";

const PageCompMap = {
  [PAGES.CHAT]: Chat,
  [PAGES.IMAGES]: Images,
};

const App: React.FC = () => {
  const [page, setPage] = useState<PAGES | undefined>();

  // 选择功能页面
  const renderPage = () => {
    const Comp = page && PageCompMap[page];

    return Comp && <Comp />;
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
              <div className="flex flex-col w-full h-full">{renderPage()}</div>
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
