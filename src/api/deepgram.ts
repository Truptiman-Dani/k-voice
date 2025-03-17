import axios from "axios";

// Load Deepgram API Key from environment variables
const DEEPGRAM_API_KEY =process.env.REACT_APP_DEEPGRAM_API_KEY;

export class DeepgramSTT {
  private ws: WebSocket | null = null;
  private onTranscription: (text: string, isFinal: boolean) => void;

  constructor(onTranscription: (text: string, isFinal: boolean) => void) {
    this.onTranscription = onTranscription;
  }

  connect() {
    if (!DEEPGRAM_API_KEY) {
      console.error("❌ Missing Deepgram API Key! Set REACT_APP_DEEPGRAM_API_KEY in .env.");
      return;
    }
  
    const url = "wss://api.deepgram.com/v1/listen?model=whisper&interim_results=true";
    console.log("🔄 Attempting WebSocket connection to Deepgram...");
  
    this.ws = new WebSocket(url, ["token", DEEPGRAM_API_KEY]);  // Use 'token' protocol for authentication
  
    this.ws.onopen = () => {
      console.log("✅ WebSocket Connected.");
      
      // Send a silence packet to keep the connection alive
      const silence = new Uint8Array(320); // 320 bytes of silence (~10ms at 16kHz)
      this.ws?.send(silence.buffer);
    };
  
    this.ws.onmessage = (event) => {
      console.log("📩 Received message:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.channel?.alternatives?.length) {
          const transcript = data.channel.alternatives[0].transcript;
          const isFinal = data.is_final || false;
          console.log("📝 Transcript:", transcript);
          this.onTranscription(transcript, isFinal);
        }
      } catch (error) {
        console.error("❌ Error parsing Deepgram response:", error);
      }
    };
  
    this.ws.onerror = (event) => {
      console.error("⚠️ WebSocket Error:", event);
    };
  
    this.ws.onclose = (event) => {
      console.warn(`🔴 WebSocket Closed. Code: ${event.code}, Reason: ${event.reason || "Unknown"}`);
    };
  }
  
  

  sendAudio(audioData: Float32Array) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log("📤 Sending audio data...");

      // Convert Float32Array to Int16Array before sending
      const int16Data = new Int16Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        int16Data[i] = Math.max(-32768, Math.min(32767, audioData[i] * 32768));
      }

      this.ws.send(int16Data.buffer);
    } else {
      console.warn("⚠️ WebSocket is not open. Cannot send audio.");
    }
  }

  disconnect() {
    if (this.ws) {
      console.log("🔌 Closing WebSocket...");
      this.ws.close();
      this.ws = null;
    }
  }
}

// 🔊 Convert Text to Speech (TTS) using Deepgram API
export const textToSpeech = async (text: string): Promise<Blob | null> => {
  if (!DEEPGRAM_API_KEY) {
    console.error("❌ Missing Deepgram API Key! Set REACT_APP_DEEPGRAM_API_KEY in .env.");
    return null;
  }

  try {
    const response = await axios.post(
      "https://api.deepgram.com/v1/speak",
      { text },
      {
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    return new Blob([response.data], { type: "audio/wav" });
  } catch (error) {
    console.error("❌ Deepgram TTS Error:", error);
    return null;
  }
};
