const STORAGE_KEY = "aiktc-chat-history";

// Get all chats
export function getChats() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all chats
export function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

// Add new chat
export function addChat(chat) {
  const chats = getChats();
  chats.unshift(chat);
  saveChats(chats);
}

// Delete chat
export function deleteChat(id) {
  const chats = getChats().filter(chat => chat.id !== id);
  saveChats(chats);
}

// Update existing chat
export function updateChat(updatedChat) {
  const chats = getChats().map(chat =>
    chat.id === updatedChat.id ? updatedChat : chat
  );
  saveChats(chats);
}
// Rename chat
export function renameChat(id, newTitle) {
  const chats = getChats().map(chat =>
    chat.id === id
      ? { ...chat, title: newTitle }
      : chat
  );

  saveChats(chats);
}
// Clear all chats
export function clearChats() {
  localStorage.removeItem(STORAGE_KEY);
}