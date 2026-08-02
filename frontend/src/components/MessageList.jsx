import UserBubble from "./UserBubble";
import BotMessage from "./BotMessage";
import TypingIndicator from "./TypingIndicator";
import FeedbackBar from "./FeedbackBar";
import { useEffect, useRef } from "react";

export default function MessageList({ messages, loading }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 16,
    position: "relative",
    zIndex: 1,
  }}
>
      {messages.map((msg, idx) => {

  if (msg.role === "user") {
    return (
      <UserBubble
        key={idx}
        content={msg.content}
      />
    );
  }
  <div ref={containerRef} />

  // Previous user message
  const previousUser = [...messages]
    .slice(0, idx)
    .reverse()
    .find(m => m.role === "user");

  return (
    <div key={idx}>
    {(msg.content || msg.functionName) && (
  <BotMessage
    content={msg.content}
    functionName={msg.functionName}
    args={msg.args}
  />
)}

      <FeedbackBar
        question={previousUser?.content || ""}
        answer={msg.content || ""}
        sessionId={localStorage.getItem("sessionId") || ""}
        chatId=""
        messageId={idx.toString()}
      />
    </div>
  );
      })}
      {loading && <TypingIndicator />}
    </div>
  );
}
