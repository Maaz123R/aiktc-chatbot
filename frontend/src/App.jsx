import React, { useState, useEffect } from 'react';
import ChatShell from './components/ChatShell';
import { LangContext } from './context/LangContext';
import { getLabels } from './utils/labels';

export default function App() {
  const [lang, setLang] = useState('en'); // en, hi, hinglish
  const labels = getLabels();
  return (
    <LangContext.Provider value={{ lang, setLang, labels }}>
      <div
  style={{
    width: "100%",
    height: "100dvh",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",   // ✅ instead of center
    padding: 20,
    background: "#eef2f7",
    overflow: "hidden",
    boxSizing: "border-box",
  }}
>
    <ChatShell />
</div>
    </LangContext.Provider>
  );
}