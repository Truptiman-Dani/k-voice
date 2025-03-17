import { useState } from "react";
import axios from "axios";

const description = `
Deepgram is an AI-powered speech-to-text and text-to-speech service. 
It allows users to transcribe audio in real time and convert text into natural-sounding speech.

Deepgram's features include:
- Real-time transcription of audio from various sources (e.g., voice calls, recorded files).
- Conversion of text into natural-sounding speech using advanced AI algorithms.
- Integration with various platforms and applications, such as Google Assistant, Amazon Alexa, and Slack.
`;

const useOpenAi = () => {
  const [answer, setAnswer] = useState<string>("");

  const askQuestion = async (question: string) => {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;  
    if (!OPENAI_API_KEY) {
      console.error("❌ OpenAI API key is missing!");
      return "API key is missing. Please check your .env file.";
    }
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
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
  
      const aiAnswer = response.data.choices[0].message.content.trim();
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
