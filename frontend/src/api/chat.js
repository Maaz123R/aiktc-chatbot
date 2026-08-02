export async function sendChatMessage(sessionId, message, onChunk) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Handle both \n\n and \r\n\r\n
    const lines = buffer.split(/\r?\n\r?\n/);
    buffer = lines.pop();

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));

        console.log("CHUNK RECEIVED:", data); // <-- ADD THIS

        onChunk(data);
      }
    }
  }
}