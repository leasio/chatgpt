import React, { useState } from "react";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponseChoicesInner,
} from "openai";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [value, setValue] = useState<string>("");

  const send = () => {
    if (!value) {
      return;
    }

    const _messages = [
      ...messages,
      { role: "user", content: value } as ChatCompletionRequestMessage,
    ];

    setMessages(_messages);
    setValue("");
    fetch("/api/chat", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        messages: _messages,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data:", data);
        setMessages([
          ..._messages,
          ...data?.choices.map(
            (o: CreateChatCompletionResponseChoicesInner) => o.message
          ),
        ]);
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-full transition-all p-4">
        <div className="h-full overflow-hidden border rounded-md shadow-md">
          <div className="flex flex-col w-full h-full">
            <main className="flex-1 overflow-hidden">
              <div className="h-full overflow-hidden overflow-y-auto">
                <div className="w-full max-w-screen-xl m-auto p-4">
                  {messages?.map((message, index) => {
                    const isUser = message.role === "user";

                    return (
                      <div
                        className={`flex w-full mb-6 overflow-hidden ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                        key={index}
                      >
                        <div
                          className={`flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8 ${
                            isUser ? "ml-2" : "mr-2"
                          }`}
                        >
                          <div className="w-8 h-8 leading-8 bg-gray-300 text-center">
                            {isUser ? "Q" : "A"}
                          </div>
                        </div>
                        <div className="overflow-hidden text-sm items-end">
                          <div
                            className={` text-wrap min-w-5 rounded-md px-3 py-2  ${
                              isUser
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-black"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>

            <footer className="p-4">
              <div className="flex items-center justify-between space-x-2">
                <input
                  className="flex-1 block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:h-10 focus-visible:outline-none resize-none px-3 py-2"
                  type="text"
                  placeholder="开聊~"
                  value={value}
                  onChange={(e) => setValue(e.target?.value)}
                />
                <button
                  className="text-white min-w-10 h-10 rounded-md px-3 ml-1 bg-blue-500 hover:bg-blue-600"
                  onClick={send}
                >
                  发送
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
