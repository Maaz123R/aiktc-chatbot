import { useState } from "react";

export default function FeedbackDialog({
  open,
  onClose,
  onSubmit,
}) {

  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  if (!open) return null;

  const reasons = [
    "Incorrect Answer",
    "Outdated Information",
    "Didn't Understand",
    "Missing Information",
    "Other",
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
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
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h3>Help us improve</h3>

        <p style={{ color: "#666" }}>
          What was wrong with this response?
        </p>

        {reasons.map((r) => (
          <label
            key={r}
            style={{
              display: "block",
              marginBottom: 10,
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              checked={reason === r}
              onChange={() => setReason(r)}
            />

            {" "}

            {r}
          </label>
        ))}

        <textarea
          placeholder="Additional comments (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            marginTop: 15,
            padding: 10,
          }}
        />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(reason, comment)
            }
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}