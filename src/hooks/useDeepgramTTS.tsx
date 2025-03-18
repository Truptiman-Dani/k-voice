import { useState } from "react";

const useDeepgramTTS = (apiKey: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = async (text: string, onEnd?: () => void) => {
    if (!text) return;

    setIsSpeaking(true);

    try {
      const response = await fetch("https://api.deepgram.com/v1/speak", {
        method: "POST",
        headers: {
          "Authorization": `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to generate TTS audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // ✅ Make sure `onended` is set BEFORE calling play()
      audio.onended = () => {
        console.log("TTS finished speaking."); // Debugging log
        setIsSpeaking(false);
        if (onEnd) {
          setTimeout(onEnd, 500); // Small delay before restarting STT
        }
      };

      audio.play();
    } catch (error) {
      console.error("Deepgram TTS error:", error);
      setIsSpeaking(false);
    }
  };

  return { isSpeaking, speakText };
};

export default useDeepgramTTS;
