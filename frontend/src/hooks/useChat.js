import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage } from '../api/chat';


import {
  getChats,
  addChat,
  updateChat,
  deleteChat,
  clearChats,
  renameChat,
} from "../utils/chatStorage";

export function useChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("chat-history");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
    setHistory(getChats());
}, []);
useEffect(() => {
  localStorage.setItem("chat-history", JSON.stringify(history));
}, [history]);
const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);
const newChat = () => {
    setMessages([]);
    setCurrentChatId(null);
};
const loadChat = (chat) => {
    setMessages(chat.messages || []);
    setCurrentChatId(chat.id);
};
const removeChat = (id) => {

    deleteChat(id);

    setHistory(getChats());

    if (currentChatId === id) {
        newChat();
    }
};

const renameCurrentChat = (id, newTitle) => {

  if (!newTitle.trim()) return;

  renameChat(id, newTitle);

  setHistory(getChats());

};

const clearAllChats = () => {
  if (!window.confirm("Delete all chat history?")) return;

  clearChats();

  setHistory([]);
  setMessages([]);
  setCurrentChatId(null);
};

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    
    const userMessage = {
  role: "user",
  content: text,
};

let botMessage = {
  role: "assistant",
  content: "",
  functionName: null,
  args: null,
};

setMessages(prev => [
  ...prev,
  userMessage,
  botMessage
]);

    try {
      await sendChatMessage(sessionId, text, (chunk) => {
       
        if (chunk.type === 'function_call') {
          botMessage.functionName = chunk.name;
          botMessage.args = chunk.args;
          botMessage.content = ''; // clear any text
          setMessages(prev => [...prev.slice(0, -1), { ...botMessage }]);
        } else if (chunk.type === 'text_chunk') {
          botMessage.content += chunk.content;
          setMessages(prev => [...prev.slice(0, -1), { ...botMessage }]);
        }
      });
    } catch (err) {
      console.error('Chat error:', err);
      botMessage.functionName = 'show_contact';
      botMessage.args = {
        reason: 'Unable to connect to the server. Please check your network or try again later.',
        contacts: [
          {
            label: "Admissions Office (Engineering)",
            phone: "+91 8104363070",
            email: "admissions@aiktc.ac.in"
          },
          {
            label: "General Enquiry",
            phone: "+91 91371 23439",
            email: "aiktc.newpanvel@aiktc.ac.in"
          }
        ]
      };
      setMessages(prev => [...prev.slice(0, -1), { ...botMessage }]);
    } finally {
  setLoading(false);

  const updatedMessages = [
    ...messages,
    {
        ...userMessage,
    },
    {
        ...botMessage,
    },
];
const title =
    currentChatId
        ? history.find(c => c.id === currentChatId)?.title || text
        : (text.length > 30
            ? text.substring(0, 30) + "..."
            : text);
const chatId = currentChatId ?? Date.now();

const chat = {
    id: chatId,
    title,
    messages: updatedMessages,
    timestamp: new Date().toLocaleString(),
};

if (currentChatId === null) {
    addChat(chat);
    setCurrentChatId(chatId);
} else {
    updateChat(chat);
}

setHistory(getChats());
  }
}, [sessionId, messages]);

return {
  messages,
  loading,
  history,
  currentChatId,
  sendMessage,
  newChat,
  loadChat,
  removeChat,
  clearAllChats,
  renameCurrentChat,
};
}
