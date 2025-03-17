import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/ask", async (req, res) => {
  const { description, question } = req.body;

  const prompt = `Answer the following question using only the given description. If you can't find the answer, say "I don't know".\n\nDescription: ${description}\n\nQuestion: ${question}\n\nAnswer:`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: prompt }],
      },
      {
        headers: { Authorization: `Bearer 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` },
      }
    );

    res.json({ answer: response.data.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: "Error processing question" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
