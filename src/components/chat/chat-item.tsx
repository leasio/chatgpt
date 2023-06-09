import React from "react";
import { ChatCompletionRequestMessage } from "openai";
import { markdown } from "@/utils/markdown";

interface Props {
  message: ChatCompletionRequestMessage;
}

const ChatItem: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full mb-6 overflow-hidden ${
        isUser ? "flex-row-reverse" : ""
      }`}
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
          className={`min-w-5 rounded-md px-3 py-2  ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
          }`}
        >
          {message.content ? (
            <div
              className="markdown"
              dangerouslySetInnerHTML={{
                __html: isUser
                  ? message.content
                  : markdown.render(message.content),
              }}
            ></div>
          ) : (
            <div className="w-5 h-5 rounded-full border-4 border-t-gray-300 border-r-gray-300 border-b-blue-400 border-l-blue-400 animate-spin"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
