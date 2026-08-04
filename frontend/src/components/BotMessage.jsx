import ResponseRouter from "./ResponseRouter";
import TextBubble from "./renderers/TextBubble";
import { useContext } from "react";
import { LangContext } from "../context/LangContext";

export default function BotMessage({ content, functionName, args }) {
  const { lang } = useContext(LangContext);
  
  const isMobile = window.innerWidth <= 768;

  if (functionName) {

       console.log("Rendering ResponseRouter", functionName);
    return (
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: isMobile ? "96%" : "90%",
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
}