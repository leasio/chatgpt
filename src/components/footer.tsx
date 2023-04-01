import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponseChoicesInner,
} from "openai";
import { useChatContext } from "@/context/chat";

const Footer: React.FC = () => {
  const enterRef = useRef<HTMLButtonElement>(null);
  const { messages, setMessages } = useChatContext(); // 对话列表
  const [userCurrentMsg, serUserCurrentMsg] = useState<string>(""); // 用户当前对话
  const [isLoading, setIsLoading] = useState<boolean>(false); // 是否加载中

  // 发送：继续话题
  const send = () => {
    const _messages = [
      ...messages,
      {
        role: "user",
        content: userCurrentMsg,
      } as ChatCompletionRequestMessage,
    ];

    setMessages(_messages);
    serUserCurrentMsg("");
    setIsLoading(true);
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
        setMessages([
          ..._messages,
          ...data?.choices.map(
            (o: CreateChatCompletionResponseChoicesInner) => o.message
          ),
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 清空：重启话题
  const clear = () => {
    setMessages([]);
  };

  useEffect(() => {
    // 键盘快捷键
    window.onkeydown = (event) => {
      switch (event.keyCode) {
        default:
          break;
        case 13: // Enter
          event.preventDefault();
          enterRef.current?.click();
          break;
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, []);

  return (
    <footer className="p-4">
      <div className="flex items-center justify-between space-x-2">
        <button
          className={`text-black min-w-10 h-10 rounded-md px-3 mr-1 ring-1 ring-inset ring-gray-300 ${
            isLoading
              ? "text-gray-500 bg-gray-200 cursor-not-allowed"
              : "hover:text-blue-600 hover:ring-blue-400"
          }`}
          onClick={isLoading ? undefined : clear}
        >
          清空
        </button>

        <input
          className={`flex-1 block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:h-10 focus-visible:outline-none resize-none px-3 py-2 ${
            isLoading ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          type="text"
          placeholder="开聊~"
          value={userCurrentMsg}
          onChange={(e) => serUserCurrentMsg(e.target?.value)}
          disabled={isLoading}
        />

        <button
          className={`text-white min-w-10 h-10 rounded-md px-3 ml-1 bg-blue-500 ${
            isLoading || !userCurrentMsg
              ? "text-gray-500 bg-gray-200 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
          onClick={isLoading || !userCurrentMsg ? undefined : send}
          ref={enterRef}
        >
          发送
        </button>
      </div>
    </footer>
  );
};

export default Footer;
