import { CHIPS } from "../data/chips";

export default function QuickChips({ onChipClick }) {
  return (
    <div
    style={{
        position: "relative",
        zIndex: 2,

        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "flex-start",

        marginTop: "20px"
    }}
>
      <p
        style={{
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        Try asking
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          maxWidth: 650,
        }}
      >
        {CHIPS.map((chip, i) => (
          <button
            key={i}
            onClick={() => onChipClick(chip.message)}
            style={{
              background: "#f8fafc",
              border: "1px solid #d1d5db",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#e5e7eb";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f8fafc";
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}