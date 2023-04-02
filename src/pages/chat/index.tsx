import React, { useEffect, useRef, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { chatContext } from "@/context/chat";
import ChatItem from "@/components/chat/chat-item";
import Sider from "@/components/chat/sider";
import Footer from "@/components/chat/footer";
import "./markdown.less";

const DEFAULT_MODEL: string = "gpt-3.5-turbo";

const Chat: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<string>(DEFAULT_MODEL); // 对话模型
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
        model,
        setModel,
        messages,
        setMessages,
        isLoading,
        setIsLoading,
      }}
    >
      <Sider />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex overflow-hidden">
          <div
            className="w-full h-full overflow-hidden overflow-y-auto"
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
    </chatContext.Provider>
  );
};

export default Chat;
