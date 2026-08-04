import { useState, useEffect } from "react";
export default function UserBubble({ content }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ maxWidth: "80%", background: "#0F6E56", color: "white", borderRadius: "18px 18px 4px 18px", padding: "10px 14px", fontSize: 14 }}>
        {content}
      </div>
    </div>
  );
}