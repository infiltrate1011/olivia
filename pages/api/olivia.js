const { Configuration, OpenAIApi } = require("openai");

console.log("ENV CHECK:", process.env.OPENAI_API_KEY ? "Key found" : "Missing key");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Olivia, a helpful and funny assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = response.data.choices?.[0]?.message?.content?.trim();
    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};
