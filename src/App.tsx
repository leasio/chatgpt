import React, { useEffect, useRef, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { chatContext } from "@/context/chat";
import ChatItem from "@/components/chat-item";
import Footer from "@/components/footer";
import "./markdown.less";

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]); // 对话列表
  const [isLoading, setIsLoading] = useState<boolean>(false); // 是否加载中

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <chatContext.Provider
      value={{
        messages,
        setMessages,
        isLoading,
        setIsLoading,
      }}
    >
      <div className="w-screen h-screen">
        <div className="h-full transition-all p-4">
          <div className="h-full overflow-hidden border rounded-md shadow-md">
            <div className="flex flex-col w-full h-full">
              <main className="flex-1 overflow-hidden">
                <div
                  className="h-full overflow-hidden overflow-y-auto"
                  ref={scrollRef}
                >
                  <div className="w-full max-w-screen-xl m-auto p-4">
                    {messages?.map((message, index) => (
                      <ChatItem message={message} key={index} />
                    ))}

                    {isLoading && (
                      <ChatItem message={{ role: "assistant", content: "" }} />
                    )}
                  </div>
                </div>
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </chatContext.Provider>
  );
};

export default App;
