const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Olivia, a helpful and funny assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};
