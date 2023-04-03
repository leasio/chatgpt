import React, { useEffect, useRef, useState } from "react";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponseChoicesInner,
} from "openai";
import { useChatContext } from "@/context/chat";
import Button from "@/components/common/button";
import Input from "@/components/common/Input"

const Footer: React.FC = () => {
  const enterRef = useRef<HTMLButtonElement>(null);
  const { model, messages, setMessages, isLoading, setIsLoading } =
    useChatContext();
  const [userCurrentMsg, serUserCurrentMsg] = useState<string>(""); // 用户当前对话

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
        model,
        messages: _messages,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newMsg = data.id
          ? data?.choices.map(
              (o: CreateChatCompletionResponseChoicesInner) => o.message
            )
          : [{ role: "system", content: data.message }];

        setMessages([..._messages, ...newMsg]);
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
    <footer className="border-t-2 shadow-inner p-4">
      <div className="flex items-center justify-between space-x-2">
        <Button 
          disabled={isLoading} 
          onClick={isLoading ? undefined : clear}
        >清空</Button>

        <Input
          className="flex-1"
          placeholder="开聊~"
          value={userCurrentMsg}
          onChange={(e) => serUserCurrentMsg(e.target?.value)}
        />

        <Button 
          btnType="primary"
          disabled={isLoading || !userCurrentMsg} 
          onClick={isLoading || !userCurrentMsg ? undefined : send}
          ref={enterRef}
        >发送</Button>
      </div>
    </footer>
  );
};

export default Footer;
