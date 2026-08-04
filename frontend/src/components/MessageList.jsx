import UserBubble from "./UserBubble";
import BotMessage from "./BotMessage";
import TypingIndicator from "./TypingIndicator";
import FeedbackBar from "./FeedbackBar";
import { useEffect } from "react";

export default function MessageList({ messages, loading, sessionId }) {
 

  return (
<div
 style={{
  display: "flex",
  flexDirection: "column",
  gap: 16,
  position: "relative",
  zIndex: 1,
  width: "100%",
}}
>
      {messages.map((msg, idx) => {
        if (msg.role === "user") {
          return <UserBubble key={idx} content={msg.content} />;
        }
        return (
          <div key={idx}>
            {(msg.content || msg.functionName) && (
              <>
                <BotMessage
                  content={msg.content}
                  functionName={msg.functionName}
                  args={msg.args}
                />

                {msg.completed && (
                  <FeedbackBar
  question={
    messages[idx - 1]?.role === "user"
      ? messages[idx - 1].content
      : ""
  }
  answer={msg.content}
 sessionId={sessionId}
chatId=""
  messageId={String(idx)}
/>
                )}
              </>
            )}
          </div>
        );
      })}
      {loading && <TypingIndicator />}
    </div>
  );
}
