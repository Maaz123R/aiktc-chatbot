import { useState, useEffect } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { parseInline } from "./TextBubble";

export default function ListCards({ data }) {
  const { title, items } = data || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  if (!items) return null;
  return (
    <div>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>{parseInline(title)}</p>
      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 8 : 12,
  }}
>
        {items.map((item, i) => (
         <div
  key={i}
  style={{
    display: "flex",
    gap: isMobile ? 8 : 10,
    background: "#f8fafc",
    borderRadius: 12,
    padding: isMobile ? 8 : 10,
    alignItems: "flex-start",
  }}
>
            {(item.image_url || item.initials) && (
             <ImageWithFallback
  src={item.image_url}
  initials={item.initials}
  size={isMobile ? 40 : 48}
  alt={item.name || ""}
/>
            )}
            <div>
             <p
  style={{
    fontWeight: 600,
    fontSize: isMobile ? 15 : 16,
  }}
>{parseInline(item.name)}</p>
              <p style={{ fontSize: isMobile ? 11 : 12, color: "#475569" }}>{parseInline(item.description)}</p>
              {item.location && <p style={{ fontSize: isMobile ? 10 : 11, color: "#64748b" }}>📍 {parseInline(item.location)}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}