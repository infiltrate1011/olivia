// /api/olivia.js
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function handler(req, res) {
  const { message } = req.body;

  const prompt = `You are Olivia, a warm, therapeutic, inclusive skincare expert. 
You ask thoughtful follow-up questions, provide gentle guidance, and recommend skincare products.
You never give medical advice, and you only suggest products based on user input and store catalog metadata.

User: ${message}`;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const reply = completion.data.choices[0].message.content;
  res.status(200).json({ reply });
}// trigger deploy
