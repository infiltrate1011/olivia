import { useState } from "react";

export default function Widget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "you", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    const res = await fetch("/api/olivia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "olivia", text: data.reply }]);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>👩🏻‍⚕️ Olivia, Your Skincare Concierge</h2>
      <div style={{ height: 300, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "you" ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                background: m.sender === "you" ? "#d6f5e6" : "#f0f0f0",
                padding: 10,
                borderRadius: 10,
                marginBottom: 4,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px 16px" }}>Send</button>
      </form>
    </div>
  );
}
