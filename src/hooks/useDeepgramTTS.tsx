import { useState } from "react";

const useDeepgramTTS = (apiKey: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = async (text: string) => {
    if (!text) return;

    setIsSpeaking(true);

    try {
      const response = await fetch("https://api.deepgram.com/v1/speak", {
        method: "POST",
        headers: {
          "Authorization": `Token ${apiKey}`, // ✅ Fixed "Token" capitalization
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate TTS audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // ✅ Always create a new Audio instance
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error("Deepgram TTS error:", error);
      setIsSpeaking(false);
    }
  };

  return { isSpeaking, speakText };
};

export default useDeepgramTTS;
