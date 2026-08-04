import { useState, useRef } from "react";

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const handleSend = () => {
  if (text.trim() && !disabled) {
    onSend(text);
    setText("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }
};

  return (
   <div
  style={{
    padding: isMobile ? "10px" : "14px 18px",
    borderTop: "1px solid #e2e8f0",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: 10,
  }}
>
  {/* Attachment Button */}
  <button
    style={{
      width: isMobile ? 36 : 42,
      height: isMobile ? 36 : 42,
      borderRadius: "50%",
      border: "1px solid #d1d5db",
      background: "#f8fafc",
      cursor: "pointer",
      fontSize: 18,
      transition: "0.2s",
    }}
    title="Attach File"
  >
    📎
  </button>

  {/* Input */}
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend()}
    placeholder="Ask anything about admissions, fees, faculty..."
    disabled={disabled}
    style={{
      flex: 1,
      padding: isMobile ? "10px 14px" : "12px 18px",
      border: "1px solid #cbd5e1",
      borderRadius: 30,
      outline: "none",
      fontSize: isMobile ? 14 : 15,
      background: "#f8fafc",
      transition: "0.2s",
      color: "#080808",
    }}
  />

  {/* Voice Button */}
  <button
    style={{
      width: isMobile ? 36 : 42,
      height: isMobile ? 36 : 42,
      borderRadius: "50%",
      border: "1px solid #d1d5db",
      background: "#f8fafc",
      cursor: "pointer",
      fontSize: 18,
      transition: "0.2s",
    }}
    title="Voice Input"
  >
    🎤
  </button>

  {/* Send Button */}
  <button
    onClick={handleSend}
    disabled={disabled}
    style={{
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      border: "none",
      borderRadius: 30,
      padding: isMobile ? "10px 16px" : "12px 24px",
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer",
      transition: "0.25s",
      boxShadow: "0 3px 8px rgba(102,126,234,.35)",
    }}
  >
    {isMobile ? "➤" : "Send"}
  </button>
</div>
  );
}