import { useState } from "react";
import useDeepgramSTT from "../hooks/useDeepgramSTT"; 

export default function SpeechRecognitionComponent() {
  const apiKey = "5d6f3d9ba4ac466173a8c9335c466bcf003a045f"; // Replace with your Deepgram API key
  const { transcript, startRecording, stopRecording } = useDeepgramSTT(apiKey);
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
    setIsRecording(!isRecording);
  };

  return (
    <div>
      <h2>Deepgram Speech-to-Text</h2>
      <div style={{ whiteSpace: "pre-wrap", padding: "10px", border: "1px solid #ddd", minHeight: "100px" }}>
        {transcript || "🎤 Speak now..."}
      </div>
      <button onClick={handleToggleRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
