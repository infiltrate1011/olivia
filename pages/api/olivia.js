const { Configuration, OpenAIApi } = require("openai");

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
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Olivia, a helpful and funny assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.data.choices?.[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || error?.message || "Unknown error";
    console.error("🔥 OpenAI error:", error);
    console.log("🔥 OpenAI error (string):", errorMessage);

    return res.status(500).json({ error: "Something went wrong", details: errorMessage });
  }
};
