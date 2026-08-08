export default function LinkCard({ title, url, icon = "🌐" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        marginBottom: 10,
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        textDecoration: "none",
        color: "#111827",
        transition: "all .2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f8fafc";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#ffffff";
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <strong>{title}</strong>
      </span>

      <span style={{ fontSize: 18 }}>↗</span>
    </a>
  );
}