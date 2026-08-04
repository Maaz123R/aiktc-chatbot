import { useState, useEffect } from "react";
import MediaCard from "./MediaCard";

export default function FacultyGrid({ data }) {
  const { department, members } = data || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontWeight: 600, marginBottom: 8, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>
        {department} Faculty
      </p>
      <div
  style={{
    display: "grid",
    gap: isMobile ? 10 : 12,
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(auto-fill, minmax(280px, 1fr))",
  }}
>
        {members?.map((m, i) => {
          console.log("Faculty Member:", m);
          const cardData = {
            name: m.name,
            designation: m.designation,
            initials: m.initials,
            image_url: m.image_url,
            details: [
              m.specialization && { icon: "school", label: "Qual.", value: m.specialization },
              m.experience && { icon: "briefcase", label: "Exp.", value: m.experience }
            ].filter(Boolean)
          };
          return <MediaCard key={i} data={cardData} />;
        })}
      </div>
    </div>
  );
}