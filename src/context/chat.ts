import React from "react";
import { ChatCompletionRequestMessage } from "openai";

export interface ChatContext {
  /** 当前对话列表 */
  messages: ChatCompletionRequestMessage[];
  /** 设置当前对话列表 */
  setMessages: (msg: ChatCompletionRequestMessage[]) => void;
}

export const chatContext = React.createContext<ChatContext>({
  messages: [],
  setMessages: () => {},
});

export const useChatContext = () => React.useContext(chatContext);
