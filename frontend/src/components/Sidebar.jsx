import React, { useState } from "react";
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal";

export default function Sidebar({
    history,
    currentChatId,
    onNewChat,
    onSelectChat,
    onDeleteChat,
    onClearChats,
    onRenameChat,

    
})
 {

  const [openMenu, setOpenMenu] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
const [selectedChat, setSelectedChat] = useState(null);
const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div
      style={{
        width: 280,
        height: "100%",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #334155",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 20,
          borderBottom: "1px solid #334155",
        }}
      >
        <h2 style={{ margin: 0 }}>🤖 AIKTC Assistant</h2>

        <button
          onClick={onNewChat}
          style={{
            marginTop: 15,
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#667eea",
            color: "white",
            fontWeight: 600,
          }}
        >
          ➕ New Chat
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: 15 }}>
        <input
          placeholder="Search chats..."
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "none",
            outline: "none",
          }}
        />
      </div>

      {/* History */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <div
  style={{
    padding: 15,
    borderTop: "1px solid #334155",
  }}
>
  <button
    onClick={onClearChats}
    style={{
      width: "100%",
      padding: 10,
      border: "none",
      borderRadius: 8,
      background: "#dc2626",
      color: "white",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    🗑 Clear All Chats
  </button>
</div>
        <div
          style={{
            padding: "10px 18px",
            color: "#94a3b8",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Today
        </div>

        {history.map((chat) => (
          <div
  key={chat.id}
  style={{
    padding: "12px 18px",
    cursor: "pointer",
    background:
      currentChatId === chat.id ? "#334155" : "transparent",
    borderLeft:
      currentChatId === chat.id
        ? "4px solid #667eea"
        : "4px solid transparent",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div
    onClick={() => {

    setOpenMenu(null);

    onSelectChat(chat);

}}
      style={{
        flex: 1,
        fontWeight: 600,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      📄 {chat.title}
    </div>

   <div style={{ position: "relative" }}>

  <button
    onClick={(e) => {
      e.stopPropagation();

      setOpenMenu(
        openMenu === chat.id ? null : chat.id
      );
    }}
    style={{
      background: "transparent",
      border: "none",
      color: "#94a3b8",
      cursor: "pointer",
      fontSize: 18,
      padding: "2px 6px",
    }}
  >
    ⋮
  </button>

  {openMenu === chat.id && (

    <div
      style={{
        position: "absolute",
        right: 0,
        top: 28,
        width: 130,
        background: "#1e293b",
        borderRadius: 10,
        boxShadow: "0 10px 30px rgba(0,0,0,.4)",
        overflow: "hidden",
        zIndex: 999,
      }}
    >

      <div
       onClick={() => {
  setSelectedChat(chat);
  setRenameOpen(true);
  setOpenMenu(null);
}}
        style={{
          padding: "10px 14px",
          cursor: "pointer",
        }}
      >
        ✏ Rename
      </div>

      <div
        onClick={() => {

    setSelectedChat(chat);

    setDeleteOpen(true);

    setOpenMenu(false);

}}
        style={{
          padding: "10px 14px",
          cursor: "pointer",
          color: "#ef4444",
        }}
      >
        🗑 Delete
      </div>

    </div>

  )}

</div>
  </div>

  <div
    style={{
      color: "#94a3b8",
      fontSize: 12,
      marginTop: 4,
    }}
  >
    {chat.timestamp}
  </div>
</div>
        ))}
      </div>

      <RenameModal
        open={renameOpen}
        initialTitle={selectedChat?.title}
        onClose={() => setRenameOpen(false)}
        onSave={(newTitle) => {
          onRenameChat(selectedChat.id, newTitle);
          setRenameOpen(false);
        }}
      />

      <DeleteModal
    open={deleteOpen}
    title={selectedChat?.title}
    onCancel={() => setDeleteOpen(false)}
    onDelete={()=>{
        onDeleteChat(selectedChat.id);
        setDeleteOpen(false);
    }}
/>

    </div>
  );
}
