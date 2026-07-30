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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    background: "#eef2f7",
  }}
>
    <ChatShell />
</div>
    </LangContext.Provider>
  );
}