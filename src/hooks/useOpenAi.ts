import { useState, useEffect } from "react";
import axios from "axios";

const useOpenAi = () => {
  const [answer, setAnswer] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    // ✅ Ensure correct path to `description.txt`
    fetch("/description.txt")
      .then((response) => response.text())
      .then((text) => setDescription(text))
      .catch((error) => console.error("❌ Error loading description.txt:", error));
  }, []);

  const askQuestion = async (question: string) => {
    // ✅ Ensure API key is loaded
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;  
    if (!OPENAI_API_KEY) {
      console.error("❌ OpenAI API key is missing!");
      return "API key is missing. Please check your .env file.";
    }

    if (!description) {
      console.error("❌ Description not loaded yet!");
      return "Description not available. Please try again later.";
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are an AI that answers questions based only on the given description." },
            { role: "user", content: `Description: ${description}\n\nQuestion: ${question}` },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiAnswer = response.data.choices[0]?.message?.content?.trim() || "No answer provided.";
      setAnswer(aiAnswer);
      return aiAnswer;
    } catch (error: any) {
      console.error("❌ Error fetching response from OpenAI:", error.response?.data || error.message);
      return "I couldn't process the request.";
    }
  };

  return { answer, askQuestion };
};

export default useOpenAi;
