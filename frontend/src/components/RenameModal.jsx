import { useState, useEffect } from "react";

export default function RenameModal({
  open,
  initialTitle,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(initialTitle || "");
  }, [initialTitle]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,.35)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 18,
            color: "#111827",
          }}
        >
          Rename Chat
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: 15,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "#e5e7eb",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave(title);
            }}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "#7c3aed",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}