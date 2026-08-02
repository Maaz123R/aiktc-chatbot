import TextBubble from "./renderers/TextBubble";

export default function BotMessage({ content, functionName, args }) {
 console.log("BotMessage content =", content);
console.log("BotMessage functionName =", functionName);
console.log("BotMessage args =", JSON.stringify(args, null, 2));

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
        data={{
          message: args?.message || content || "NO MESSAGE RECEIVED",
        }}
      />
    </div>
  );
}