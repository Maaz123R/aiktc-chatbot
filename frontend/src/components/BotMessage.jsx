import ResponseRouter from "./ResponseRouter";
import TextBubble from "./renderers/TextBubble";
import { useContext } from "react";
import { LangContext } from "../context/LangContext";

export default function BotMessage({ content, functionName, args }) {
  console.log("BotMessage:", { content, functionName, args });

  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "90%",
        background: "#fff",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <TextBubble
        data={{
          message: args?.message || content || "NO MESSAGE RECEIVED",
        }}
      />
    </div>
  );
}
  // Other function responses (cards, tables, etc.)
  if (functionName) {
    return (
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: "90%",
          background: "#ffffff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          marginBottom: 10,
        }}
      >
        <ResponseRouter
          functionName={functionName}
          args={args}
          lang={lang}
        />
      </div>
    );
  }

  // Plain text responses
  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "90%",
        background: "#ffffff",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        color: "#111827",
        marginBottom: 10,
      }}
    >
      <TextBubble
        data={{ message: content }}
        lang={lang}
      />
    </div>
  );
