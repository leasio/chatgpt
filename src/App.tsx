import React, { useState } from "react";
import Enter from "@/components/common/enter";
import Chat from "@/pages/chat";

enum PAGES {
  CHAT = "CHAT",
  PAINT = "PAINT",
}

type PageType = PAGES | undefined;

const PageCompMap = {
  [PAGES.CHAT]: Chat,
  [PAGES.PAINT]: Chat,
};

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>();

  if (!page) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Enter onClick={() => setPage(PAGES.CHAT)} />
      </div>
    );
  }

  // 选择功能页面
  const renderPage = () => {
    const Comp = page && PageCompMap[page];

    return Comp && <Comp />;
  };

  return <div className="w-screen h-screen">{renderPage()}</div>;
};

export default App;
