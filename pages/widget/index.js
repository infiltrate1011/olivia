import { useState } from "react";

export default function Widget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "you", text: input }]);
    setInput("");

    try {
      const res = await fetch("/api/olivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "olivia", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "olivia", text: "Something went wrong." },
      ]);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h2>💬 Olivia, your skincare concierge</h2>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "you" ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                background: m.sender === "you" ? "#daf5e8" : "#eee",
                padding: 10,
                borderRadius: 10,
                margin: "5px 0",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your skin"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
      </form>
    </div>
  );
}
