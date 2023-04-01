import React, { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { chatContext } from "@/context/chat";
import ChatItem from "@/components/chat-item";
import Footer from "@/components/footer";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  return (
    <chatContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      <div className="w-screen h-screen">
        <div className="h-full transition-all p-4">
          <div className="h-full overflow-hidden border rounded-md shadow-md">
            <div className="flex flex-col w-full h-full">
              <main className="flex-1 overflow-hidden">
                <div className="h-full overflow-hidden overflow-y-auto">
                  <div className="w-full max-w-screen-xl m-auto p-4">
                    {messages?.map((message, index) => (
                      <ChatItem message={message} key={index} />
                    ))}
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
