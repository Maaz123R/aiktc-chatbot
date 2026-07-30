import UserBubble from "./UserBubble";
import BotMessage from "./BotMessage";
import TypingIndicator from "./TypingIndicator";
import FeedbackBar from "./FeedbackBar";

export default function MessageList({ messages, loading }) {
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

  // Previous user message
  const previousUser = [...messages]
    .slice(0, idx)
    .reverse()
    .find(m => m.role === "user");

  return (
    <div key={idx}>
      <BotMessage
        content={msg.content}
        functionName={msg.functionName}
        args={msg.args}
      />

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
