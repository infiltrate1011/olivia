export default function Widget() {
  return (
    <html>
      <head>
        <title>Chat with Olivia</title>
        <style>{`
          body {
            margin: 0;
            font-family: sans-serif;
            background: #fff;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          #chat {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
          }
          .msg {
            margin-bottom: 12px;
            padding: 10px 14px;
            border-radius: 10px;
            max-width: 80%;
          }
          .user {
            align-self: flex-end;
            background-color: #fcddec;
          }
          .olivia {
            align-self: flex-start;
            background-color: #f1f1f1;
          }
          #form {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ddd;
          }
          input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-right: 8px;
          }
          button {
            padding: 10px 14px;
            border: none;
            background: #fcddec;
            border-radius: 8px;
            cursor: pointer;
          }
        `}</style>
      </head>
      <body>
        <div id="chat"></div>
        <form id="form">
          <input type="text" id="input" placeholder="Ask Olivia..." autoComplete="off" />
          <button type="submit">Send</button>
        </form>
        <script dangerouslySetInnerHTML={{ __html: `
          const chat = document.getElementById("chat");
          const form = document.getElementById("form");
          const input = document.getElementById("input");

          function appendMessage(text, sender) {
            const msg = document.createElement("div");
            msg.className = "msg " + sender;
            msg.textContent = text;
            chat.appendChild(msg);
            chat.scrollTop = chat.scrollHeight;
          }

          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            appendMessage(text, "user");
            input.value = "";

            const res = await fetch("/api/olivia", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            appendMessage(data.reply, "olivia");
          });
        ` }} />
      </body>
    </html>
  );
}
