import React, { useState } from "react";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponseChoicesInner,
} from "openai";
import { useChatContext } from "@/context/chat";

const Footer: React.FC = () => {
  const { messages, setMessages } = useChatContext();
  const [value, setValue] = useState<string>("");

  const send = () => {
    if (!value) {
      return;
    }

    const _messages = [
      ...messages,
      {
        role: "user",
        content: value,
      } as ChatCompletionRequestMessage,
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
  );
};

export default Footer;
